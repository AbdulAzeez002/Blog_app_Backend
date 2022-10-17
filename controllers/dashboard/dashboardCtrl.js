const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/user/User");
const Post = require("../../models/post/post")

const dashboardItems = expressAsyncHandler(async (req, res) => {
  console.log('dashboard')
    let d1, d2, text;
    d1 = new Date();
    d1.setDate(d1.getDate() - 7);
    d2 = new Date();
    text = "For the Last 7 days";

    // Date wise sales report
    const date = new Date(Date.now());
    const month = date.toLocaleString("default", { month: "long" });

    let userReport = await User.aggregate([

        {
            $match: {
                createdAt: {
                    $lt: d2,
                    $gte: d1,
                },
            },
        },

        {
            $group: {
                _id: null,
                users: { $sum: 1 },
            },
        },
    ])


    let blockReport = await User.aggregate([

        {
            $match: {
                updatedAt: {
                    $lt: d2,
                    $gte: d1,
                },
            },
        },

        {
             $match:{
                isBlocked:true
             }
        },

        {
            $group: {
                _id: null,
                blockedUsers: { $sum: 1 },
            },
        },
    ])

    let postReport = await Post.aggregate([

        {
            $match: {
                updatedAt: {
                    $lt: d2,
                    $gte: d1,
                },
            },
        },

        {
            $group: {
                _id: null,
                posts: { $sum: 1 },
            },
        },
    ])


    let graphReport = await User.aggregate([

        {
            $match: {
                createdAt: {
                    $lt: d2,
                    $gte: d1,
                },
            },
        },

        {
            $group: {
                _id: { $dayOfMonth: "$createdAt" },
                users: { $sum: 1 },
            },
        },
    ])

    // console.log(graphReport);


    let dateArray = [];
    let totalArray = [];

    graphReport.forEach((s) => {
      dateArray.push(`${month}-${s._id}`);
      totalArray.push(s.users);
    })


    let obj={}

    obj.dateArray=dateArray
    obj.totalArray=totalArray


    obj.userReport=userReport
    obj.blockReport=blockReport
    obj.postReport=postReport


    console.log(obj)

  res.json(obj)

})


module.exports = { dashboardItems }
