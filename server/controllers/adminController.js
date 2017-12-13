'user strict';

//admin controller
var AdminController = {
    index: (req,res)=> {
       res.status(200)
           .json({
                message: 'Welcome to the admin area'+'!',
                username: '' + req.user.username,
                email: '' + req.user.email,
                phone: ''+req.user.mobile,
                bio: '' + req.user.bio
            });
    }
}

module.exports = AdminController;
