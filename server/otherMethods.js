const products = [
    {name:"Colour Block Cotton Shirt",price:3000,imageUrl:"//uspoloassn.in/cdn/shop/files/2_b0abd7d4-fbb7-4254-902c-2aada9b7a485_360x.jpg?v=1709814125",productType:"Shirts",rating:4,category:"Men",tags:["inSale","Best Seller"], sizeAvailability: [
      { size: 'S', quantity: 2, isAvailable: true },
      { size: 'M', quantity: 3, isAvailable: true },
      { size: 'L', quantity: 0, isAvailable: false },
      { size: 'XL', quantity: 3, isAvailable: true }
    ], description: "Look effortlessly stylish in this classic Oxford shirt, featuring a button-down collar and engineered stripes on the chest."},
    {name:"Solid Cotton Polo T-Shirt",price:1000,imageUrl:"//uspoloassn.in/cdn/shop/products/2_8df8f218-2dca-4213-a724-b89c7d4aa815_360x.jpg?v=1692255904",productType:"T-Shirts",rating:3.8,category:"Men",tags:["inSale","Best Seller","New Arrivals"], sizeAvailability: [
      { size: 'S', quantity: 0, isAvailable: false },
      { size: 'M', quantity: 5, isAvailable: true },
      { size: 'L', quantity: 2, isAvailable: false },
      { size: 'XL', quantity: 3, isAvailable: true }
    ], description: "This pique knit cotton polo tee features a striped collar and is framed with logo detail."},
    {name:"Cropped Fit Blue Jeans",price:2000,imageUrl:"//uspoloassn.in/cdn/shop/files/2_f372a0f1-0824-42f7-a27b-d8c314ab5b52_360x.jpg?v=1713339397",productType:"Jeans",rating:4.3,category:"Men",tags:["Best Seller","New Arrivals"], sizeAvailability: [
      { size: 'S', quantity: 6, isAvailable: true },
      { size: 'M', quantity: 4, isAvailable: true },
      { size: 'L', quantity: 7, isAvailable: false },
      { size: 'XL', quantity: 0, isAvailable: true }
    ], description: "These jeans from the Super Soft Denim collection are a versatile pair that you would reach out to every morning."},
    {name:"Notch Neck Floral Top",price:1950,imageUrl:"//uspoloassn.in/cdn/shop/files/2_91e47d7a-ce0f-4a11-9e64-eafd7bb7683b_360x.jpg?v=1713339496",productType:"Tops",rating:4.4,category:"Women",tags:["Best Seller","New Arrivals"], sizeAvailability: [
      { size: 'S', quantity: 10, isAvailable: true },
      { size: 'M', quantity: 15, isAvailable: true },
      { size: 'L', quantity: 5, isAvailable: false },
      { size: 'XL', quantity: 13, isAvailable: true }
    ], description: "This relaxed top features gathered details and a floral print, ideal for effortless transitions from beach outings to casual city strolls."},
    {name:"V-Neck Geometric Top",price:1950,imageUrl:"//uspoloassn.in/cdn/shop/files/2_23890e81-6110-4633-8202-17d7d12ed8d1_360x.jpg?v=1713339463",productType:"Tops",rating:4.4,category:"Women",tags:["Best Seller","New Arrivals"], sizeAvailability: [
      { size: 'S', quantity: 10, isAvailable: true },
      { size: 'M', quantity: 4, isAvailable: true },
      { size: 'L', quantity: 0, isAvailable: false },
      { size: 'XL', quantity: 6, isAvailable: true }
    ], description: "This relaxed V-neck top features gathered details and a floral print, ideal for effortless transitions from beach outings to casual city strolls."},
    {name:"Chiffon Printed Dress",price:2500,imageUrl:"//uspoloassn.in/cdn/shop/files/2_dfcffb2d-166f-44a9-8b45-ca146c02bc77_360x.jpg?v=1713527778",productType:"Dresses",rating:4.4,category:"Women",tags:["Best Seller","inSale"], sizeAvailability: [
      { size: 'S', quantity: 5, isAvailable: true },
      { size: 'M', quantity: 4, isAvailable: true },
      { size: 'L', quantity: 2, isAvailable: false },
      { size: 'XL', quantity: 6, isAvailable: true }
    ], description: "Perfect for warm-weather outings, this dress combines comfort with chic sophistication, making it an essential piece for any occasion."},
    {name:"Geometric Print Shirt Dress",price:2000,imageUrl:"//uspoloassn.in/cdn/shop/files/2_8ac7ccd0-9b95-4b60-a321-2870aa6ca4fd_360x.jpg?v=1711106416",productType:"Dresses",rating:4.2,category:"Women",tags:["Best Seller","inSale"],sizeAvailability: [
      { size: 'S', quantity: 12, isAvailable: true },
      { size: 'M', quantity: 4, isAvailable: true },
      { size: 'L', quantity: 8, isAvailable: false },
      { size: 'XL', quantity: 6, isAvailable: true }
    ], description: "Perfect for warm-weather outings, this dress combines comfort with chic sophistication, making it an essential piece for any occasion."},
    {name:"Straight Fit Blue Jeans",price:1800,imageUrl:"//uspoloassn.in/cdn/shop/files/2_4d75fb47-92ce-4059-afbf-9888088b796e_360x.jpg?v=1718197536",productType:"Jeans",rating:4.2,category:"Women",tags:["Best Seller","inSale"], sizeAvailability: [
      { size: 'S', quantity: 10, isAvailable: true },
      { size: 'M', quantity: 14, isAvailable: true },
      { size: 'L', quantity: 6, isAvailable: false },
      { size: 'XL', quantity: 6, isAvailable: true }
    ], description: "These jeans from the Super Soft Denim collection are a versatile pair that you would reach out to every morning."},
    {name:"Skinny Fit Grey Jeans",price:1600,imageUrl:"//uspoloassn.in/cdn/shop/files/2_fb152a35-9eb6-49a8-9b03-41d182cda10b_360x.jpg?v=1698921844",productType:"Jeans",rating:4.1,category:"Women",tags:["Best Seller","inSale"], sizeAvailability: [
      { size: 'S', quantity: 12, isAvailable: true },
      { size: 'M', quantity: 6, isAvailable: true },
      { size: 'L', quantity: 7, isAvailable: false },
      { size: 'XL', quantity: 8, isAvailable: true }
    ], description: "These jeans from the Super Soft Denim collection are a versatile pair that you would reach out to every morning."}
  ]

const users = [
	{
		firstName: "Prabodh",
		lastName: "Sen",
		phone: "864523456791",
		email: "prabodhsen@gmail.com",
		password: "Mp65@ded51"
	}
]  

const uploadManyUsers = async () => {
    try {
      const options = {ordered: true}
      const result = await User.insertMany(users, options)
  
      console.log(`documents were inserted.`)
    } catch (error) {
      console.log(error)
    }
  }