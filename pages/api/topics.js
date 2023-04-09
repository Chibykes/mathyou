// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let topics = [
  {
    id: "mm9mx",
    image: "/algebra.jpg", 
    heading: "Algebra", 
    description: "The part of mathematics in which letters and other general symbols are used to represent numbers and quantities in formulae and equations.",
    details: "",
    rating: 3.5,
    watch: "200",
    video: "/sample-math.mp4"
  },
  {
    id: "d538s",
    image: "/quadratic-equations.jpg", 
    heading: "Quadratic Equations", 
    description: "A quadratic equation in math is a second-degree equation of the form ax2 + bx + c = 0.",
    details: `
      <p class="text-lg mb-2"><strong>What are Quadratic equations</strong></p>
      <p class="">Quadratic equations are second-degree algebraic expressions and are of the form ax2 + bx + c = 0. The term "quadratic" comes from the Latin word "quadratus" meaning square, which refers to the fact that the variable x is squared in the equation. In other words, a quadratic equation is an “equation of degree 2.” There are many scenarios where a quadratic equation is used. Did you know that when a rocket is launched, its path is described by a quadratic equation? Further, a quadratic equation has numerous applications in physics, engineering, astronomy, etc.</p>
      <p class="">Quadratic equations have maximum of two solutions, which can be real or complex numbers. These two solutions (values of x) are also called the roots of the quadratic equations and are designated as (α, β). We shall learn more about the roots of a quadratic equation in the below content.</p>`,
    rating: 3.5,
    watch: "200",
    video: "/sample-math.mp4"
  },
  {
    id: "wwqhr",
    image: "/indices.jpg", 
    heading: "Indices", 
    description: "An index, or power, is the small floating number that appears after a number or letter. Indices show how many times a number or letter has been multiplied by itself.",
    details: "",
    rating: 3.5,
    watch: "200",
    video: "/sample-math.mp4"
  },
  {
    id: "uvb1b",
    image: "/arithmetic-progression.png", 
    heading: "Arithmetic Progression", 
    description: "Arithmetic Progression (AP) is a sequence of numbers in order, in which the difference between any two consecutive numbers is a constant value. It is also called Arithmetic Sequence.",
    details: "",
    rating: 3.5,
    watch: "200",
    video: "/sample-math.mp4"
  },
]

export default function handler(req, res) {

  if(req.query.id){
    return res.status(200).json(topics.find(topic => topic.id === req.query.id));
  }

  res.status(200).json(topics)
  
}
