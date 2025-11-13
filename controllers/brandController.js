const Brand=require('../Models/Brand')
const bcrypt=require('bcrypytjs')
const jwt=require('jsonwebtoken')
//create new brand

export const createBrand=async(req,res)=>{
    try{
        const{name,email,password,logo,description,isActive}=req.body
        if (!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Name,email and password are required"
            })
        }
        const existingBrand=await Brand.findOne({
            $or:[{email},{name}]
        })
        if(existingBrand)
            return res.status(409).json({
        success:false,message:"Brand with this email or name already exists"})
    const salt=await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash(password,salt)

    const brand=new Brand({
        name,email,password:hashedpassword,logo,desciption,isActive
    })
    await brand.save()
    }
    catch(err){
        console.log("create brand error")
        res.status(500).json({
            success:false,message:"Server error while creating brand"
        })
    }

}

//select all brands

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).select('-password');
    
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands
    });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching brands',
      error: error.message
    });
  }
};

// select a brand

export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).select('-password');
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Get brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching brand',
      error: error.message
    });
  }
};
//brand login
export const brandLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find brand
    const brand = await Brand.findOne({ email });
    if (!brand) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if brand is active
    if (!brand.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Brand account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, brand.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token (you'll need to implement JWT)
    // const token = jwt.sign({ brandId: brand._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    var token = jwt.sign({ brandId:brand._id }, process.env.JWT-Secret,{expiresIn:'7d'});


    res.status(200).json({
      success: true,
      message: 'Brand login successful',
      data: {
        token,
        brand: {
          id: brand._id,
          name: brand.name,
          email: brand.email,
          logo: brand.logo,
          description: brand.description
        }
      }
    });
  } catch (error) {
    console.error('Brand login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during brand login',
      error: error.message
    });
  }
};


export const updateBrand = async (req, res) => {
  try {
    const { name, logo, description, isActive } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (logo) updateFields.logo = logo;
    if (description) updateFields.description = description;
    if (isActive) updateFields.isActive = isActive;

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true}
    ).select('-password');

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Brand updated successfully',
      data: brand
    });
  } catch (error) {
    console.error('Update brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating brand',
      error: error.message
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    console.error('Delete brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting brand',
      error: error.message
    });
  }
};