const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewURLParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const randomImage = [
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432490/regnum_picture_1482138262427880_normal_chxlns.jpg',
        filename: 'regnum_picture_1482138262427880_normal_chxlns.jpg',
        },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/shutterstock_625918454.0_fnzplk.jpg',
        filename: 'shutterstock_625918454.0_fnzplk.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/24faa152b3e3a718eec5fdca9d386fbe_oiblw9.jpg',
        filename: '24faa152b3e3a718eec5fdca9d386fbe_oiblw9.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/6f0011fb4abf4ddc23e0ab7041dded82_xqs3xl.jpg',
        filename: '6f0011fb4abf4ddc23e0ab7041dded82_xqs3xl.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/NSW-National-Parks-and-Wildlife-Service_hg7fdz.jpg',
        filename: 'NSW-National-Parks-and-Wildlife-Service_hg7fdz.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/08b9a78a798017ecc332be065af6d5b2_suswug.jpg',
        filename: '08b9a78a798017ecc332be065af6d5b2_suswug.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/5d6a02b1ec55f3000f6156823e60c4b0_s3t7xy.jpg',
        filename: '5d6a02b1ec55f3000f6156823e60c4b0_s3t7xy.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432489/ATbreAjkc_p2ghmj.jpg',
        filename: 'ATbreAjkc_p2ghmj.jpg',
    },
    {
        url: 'https://res.cloudinary.com/duxibq5cd/image/upload/v1679432488/87194d86e06d3fb46d394ace2b84496f_bmayhq.jpg',
        filename: '87194d86e06d3fb46d394ace2b84496f_bmayhq.jpg',
    }
]
const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '640653d8e0d64fb61b865b17',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry:{"type":"Point","coordinates":[cities[random1000].longitude, cities[random1000].latitude]},
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price,
            images: randomImage[Math.floor(Math.random() * 8)]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})