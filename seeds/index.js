const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const randPrice = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5fd97adfa4f805b9334ae351',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/chrisinthecloud/image/upload/c_scale,w_453/v1608180849/YelpCamp/ozgrpwjtmlhq17w76wzn.jpg',
          filename: 'YelpCamp/ozgrpwjtmlhq17w76wzn',
        },
        {
          url: 'https://res.cloudinary.com/chrisinthecloud/image/upload/v1608180100/YelpCamp/lyamyvrby3y3ki9uhfi5.jpg',
          filename: 'YelpCamp/lyamyvrby3y3ki9uhfi5',
        },
      ],
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, suscipit dignissimos. Ea deserunt nemo laborum odio optio vel nulla id maxime quibusdam quam. Architecto nisi commodi esse nesciunt aperiam eveniet.',
      price: randPrice,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
