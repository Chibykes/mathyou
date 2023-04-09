import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FaCheckDouble } from 'react-icons/fa';
import { signIn, signOut } from '../hooks/firebase';
import { FcGoogle } from 'react-icons/fc';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';

export default function Class({ topic }) {

  function* range(start, end){
    for(let i = start; i <= end; i++) yield i;
  }

  const [progress, setProgress] = useState(25);
  const [currentChapter, setCurrentChapter] = useState("Main Topic");
  const [finishedChapter, setFinishedChapter] = useState([]);

  const { user } = useContext(UserContext);

  const handleChapterChange = (num) => {
    setCurrentChapter(num);
  }

  useEffect(() => {
    window.onscroll = e => {
        let progress = (document.documentElement.scrollTop / ( document.body.scrollHeight - window.innerHeight ) ) * 100;
        setProgress(Math.ceil(progress));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{topic.heading}</title>
      </Head>

      <main className='max-w-7xl mx-auto divide-y'>

        <Navbar logo="blue" />

        <div className='w-full h-full flex lg:flex-row flex-col relative divide-x divide-y divide-neutral-200'>

          <div className='p-5 space-y-5 overflow-auto lg:w-1/5 h-full sticky top-0 z-[9] bg-white'>

            <div className='lg:block flex space-y-1'>
              {["Main Topic","Practise"].map(num => (
                <Link 
                  href="#"
                  key={num}
                  onClick={() => handleChapterChange(num)}
                  className={`
                    flex items-center gap-3 px-3 py-4 
                    text-xs font-bold rounded-md
                    ${num === currentChapter ? "text-white" : "text-black"}
                    ${num === currentChapter ? "bg-sky-600" : "bg-transparent"}
                `}>
                <div className={`
                  shrink-0 w-2 h-2 rounded-full
                  ring-2 ring-offset-2
                  ${finishedChapter.includes(num) ? num === currentChapter ? "bg-white" : "bg-neutral-200" : "bg-transparent"}
                  ${finishedChapter.includes(num) && (num === currentChapter) && "ring-white ring-offset-sky-600"}
                  ${finishedChapter.includes(num) && (num !== currentChapter) && "ring-neutral-200 ring-offset-white"}
                  ${!finishedChapter.includes(num) && (num === currentChapter) && "ring-white ring-offset-sky-600"}
                  ${!finishedChapter.includes(num) && (num !== currentChapter) && "ring-neutral-200 ring-offset-white"}
                `}></div>

                <span className='truncate'>{num}</span>
              </Link>
              ))}
            </div>
          </div>

          <div className='lg:w-3/5 p-5 lg:px-12 space-y-5'>

            {currentChapter === "Main Topic" && 

            <>
              <p className='text-2xl font-bold'>{topic.heading}</p>

              <div className="group relative w-full h-96 inset-0 overflow-hidden rounded-md">
                  <Image 
                      className="object-cover"
                      src={topic.image}
                      alt=""
                      fill
                  />

                  <div className="
                      absolute top-0 left-0 h-full w-full bg-black opacity-0
                      group-hover:opacity-50 duration-200"
                  ></div>

                  <BsFillPlayFill className="
                      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      text-white text-7xl opacity-0
                      group-hover:opacity-100 duration-200"
                  />
              </div>

              <div className='text-sm py-5'
                dangerouslySetInnerHTML={{
                  // __html: `
                  // <div id="learnSection" class="learnSection">
                  // <h1>Algebra</h1>
                  
                  // <p>Algebra is the branch of mathematics that helps in the representation of problems or situations in the form of mathematical expressions. It involves variables like x, y, z, and mathematical operations like addition, subtraction, multiplication, and division to form a meaningful mathematical expression. All the branches of mathematics such as trigonometry, calculus, coordinate geometry, involve the use of algebra. One simple example of an expression in algebra is 2x + 4 = 8.</p>
                  
                  // <p>Algebra deals with symbols and these symbols are related to each other with the help of operators. It is not just a mathematical concept, but a skill that all of us use in our daily life without even realizing it. Understanding algebra as a concept is more important than solving equations and finding the right answer, as it is useful in all the other topics of mathematics that you are going to learn in the future or you have already learned in past.</p>
                  
                  // <table border="0" cellpadding="1" cellspacing="1" id="table-of-content" style="width: 100%; display: none;" class="subMenuSticky">
                  //   <tbody>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">1.</span></td>
                  //       <td><a href="#what">What is Algebra?</a></td>
                  //     </tr>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">2.</span></td>
                  //       <td><a href="#branches">Branches of Algebra</a></td>
                  //     </tr>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">3.</span></td>
                  //       <td><a href="#algtopics">Algebra Topics</a></td>
                  //     </tr>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">4.</span></td>
                  //       <td><a href="#algform">Algebra Formulas</a></td>
                  //     </tr>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">5.</span></td>
                  //       <td><a href="#operations">Algebraic Operations</a></td>
                  //     </tr>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">6.</span></td>
                  //       <td><a href="#basic">Basic Rules and Properties of Algebra</a></td>
                  //     </tr>
                  //     <tr>
                  //       <td style="text-align: center"><span style="color: #0000ff">7.</span></td>
                  //       <td><a href="#faqonalg">FAQs on Algebra</a></td>
                  //     </tr>
                  //   </tbody>
                  // </table>
                  
                  // <div id="what">
                  // <div id="circle" style="background-color: rgb(225, 255, 246);"></div><h2>What is Algebra?</h2>
                  // </div>
                  
                  // <p>Algebra is a branch of mathematics that deals with symbols and the arithmetic operations across these symbols. These symbols do not have any fixed values and are called <a href="https://www.cuemath.com/algebra/variables-constants-and-expressions/">variables.</a> In our real-life problems, we often see certain values that keep on changing. But there is a constant need to represent these changing values. Here in algebra, these values are often represented with symbols such as x, y, z, p, or q, and these symbols are called variables. Further, these symbols are manipulated through various arithmetic operations of <a href="https://www.cuemath.com/numbers/addition/">addition</a>, subtraction, <a href="https://www.cuemath.com/numbers/multiplication/">multiplication</a>, and division, with an objective to find the values.</p>
                  
                  // <p><img alt="Algebraic Equation" src="https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/algebric-expression-image-3-1615010733.png" style="width: 300px;"></p>
                  
                  // <p>The above algebraic expressions are made up of variables, operators, and constants. Here the numbers 4 and 28 are constants, x is the variable, and the arithmetic operation of addition is performed.</p>
                  
                  // <div id="branches">
                  // <div id="circle" style="background-color: rgb(225, 255, 246);"></div><h2>Branches of Algebra</h2>
                  // </div>
                  
                  // <p>The complexity of algebra is simplified by the use of numerous algebraic expressions. Based on the use and the complexity of the expressions, algebra can be classified into various branches that are listed below:</p>
                  
                  // <ul>
                  //   <li>Pre-algebra</li>
                  //   <li>Elementary Algebra</li>
                  //   <li>Abstract Algebra</li>
                  //   <li>Universal Algebra</li>
                  // </ul>
                  
                  // <h3>Pre-algebra</h3>
                  
                  // <p>The basic ways of presenting the unknown values as variables help to create mathematical expressions. It helps in transforming real-life problems into an <a href="https://www.cuemath.com/algebra/algebraic-expression/">algebraic expression</a> in mathematics. Forming a mathematical expression of the given problem statement is part of pre-algebra.</p>
                  
                  // <h3>Elementary Algebra</h3>
                  
                  // <p>Elementary algebra deals with solving the algebraic expressions for a viable answer. In elementary algebra, simple variables like x, y, are represented in the form of an equation. Based on the degree of the variable, the equations are called linear equations, quadratic equations, polynomials. <a href="https://www.cuemath.com/algebra/linear-equations/"> Linear equations</a> are of the form, ax + b = c, ax + by + c = 0, ax + by + cz + d = 0. Elementary algebra based on the degree of the variables, branches out into quadratic equations and polynomials. A general form of representation of a quadratic equation is ax<sup>2</sup> + bx + c = 0, and for a polynomial equation, it is ax<sup>n </sup>+ bx<sup>n-1</sup>+ cx<sup>n-2</sup>+ .....k = 0.</p>
                  
                  // <h3>Abstract Algebra</h3>
                  
                  // <p>Abstract algebra deals with the use of abstract concepts like groups, rings, vectors rather than simple mathematical number systems. Rings are a simple level of abstraction found by writing the addition and multiplication properties together. Group theory and ring theory are two important concepts of abstract algebra. Abstract algebra finds numerous applications in computer sciences, physics, astronomy, and uses vector spaces to represent quantities.</p>
                  
                  // <h3>Universal Algebra</h3>
                  
                  // <p>All the other mathematical forms involving trigonometry, <a href="https://www.cuemath.com/calculus/">calculus</a>, <a href="https://www.cuemath.com/geometry/coordinate-geometry/">coordinate geometry</a> involving algebraic expressions can be accounted as universal algebra. Across these topics, universal algebra studies mathematical expressions and does not involve the study of models of algebra. All the other branches of algebra can be considered as the subset of universal algebra. Any of the real-life problems can be classified into one of the branches of mathematics and can be solved using abstract algebra.</p>
                  
                  // <div id="algtopics">
                  // <div id="circle" style="background-color: rgb(225, 255, 246);"></div><h2>Algebra Topics</h2>
                  // </div>
                  
                  // <p>Algebra is divided into numerous topics to help for a detailed study. Here, we have listed some of the important topics of algebra such as algebraic expressions and equations, <a href="https://www.cuemath.com/numbers/sequence-and-series/">sequence and series</a>, exponents, logarithm, and sets.</p>
                  
                  // <h3>Algebraic Expressions</h3>
                  
                  // <p>An algebraic expression in algebra is formed using <a href="https://www.cuemath.com/numbers/integers/">integer</a> constants, variables, and basic arithmetic operations of addition(+), <a href="https://www.cuemath.com/numbers/subtraction/">subtraction</a>(-), multiplication(×), and <a href="https://www.cuemath.com/numbers/division/">division</a>(/). An example of an algebraic expression is 5x + 6. Here 5 and 6 are fixed numbers and x is a variable. Further, the variables can be simple variables using alphabets like x, y, z or can have complex variables like x<sup>2</sup>, x<sup>3</sup>, x<sup>n</sup>, xy, x<sup>2</sup>y, etc. Algebraic expressions are also known as polynomials. A <a href="https://www.cuemath.com/algebra/polynomials/">polynomial</a> is an expression consisting of variables (also called indeterminates), coefficients, and non-negative integer exponents of variables. Example: 5x<sup>3</sup> + 4x<sup>2</sup> + 7x + 2 = 0.</p>
                  
                  // <p><img alt="Algebraic Expression" src="https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/algebraic-expression-1643716398.png" style="width: 400px;"></p>
                  
                  // <p>An equation is a mathematical statement with an 'equal to' symbol between two algebraic expressions that have equal values. Given below are the different types of equations, based on the degree of the variable, where we apply the concept of algebra:</p>
                  
                  // <ul>
                  //   <li><strong>Linear Equations: </strong>Linear equations help in representing the relationship between variables such as x, y, z, and are expressed in exponents of one degree. In these linear equations, we use algebra, starting from the basics such as the addition and subtraction of algebraic expressions.</li>
                  //   <li><strong>Quadratic Equations</strong>: A <a href="https://www.cuemath.com/algebra/quadratic-equations/">quadratic equation</a> can be written in the standard form as ax<sup>2 </sup>+ bx + c = 0, where a, b, c are constants and x is the variable. The values of x that satisfy the equation are called solutions of the equation, and a quadratic equation has at most two solutions.</li>
                  //   <li><strong>Cubic Equations:</strong> The algebraic equations having variables with power 3 are referred to as cubic equations. A generalized form of a cubic equation is ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0. A cubic equation has numerous applications in calculus and three-dimensional geometry (<a href="https://www.cuemath.com/geometry/3d-geometry/">3D Geometry</a>).</li>
                  // </ul>
                  
                  // <h3>Sequence and Series</h3>
                  
                  // <p>A set of numbers having a relationship across the numbers is called a sequence. A sequence is a set of numbers having a common mathematical relationship between the number, and a series is the sum of the terms of a sequence. In mathematics, we have two broad number sequences and series in the form of arithmetic progression and geometric progression. Some of these series are finite and some series are infinite. The two series are also called arithmetic progression and geometric progression and can be represented as follows.</p>
                  
                  // <ul>
                  //   <li><strong>Arithmetic Progression: </strong>An <a href="https://www.cuemath.com/algebra/arithmetic-progressions/">Arithmetic progression (AP)</a> is a special type of progression in which the difference between two consecutive terms is always a constant. The terms of an arithmetic progression series is a, a+d, a + 2d, a + 3d, a + 4d, a + 5d, .....</li>
                  //   <li><strong>Geometric Progression: </strong>Any progression in which the ratio of adjacent terms is fixed is a <a href="https://www.cuemath.com/algebra/what-are-geometric-progressions/">Geometric Progression</a>. The general form of representation of a geometric sequence is a, ar, ar<sup>2</sup>, ar<sup>3</sup>, ar<sup>4</sup>, ar<sup>5</sup>, .....</li>
                  // </ul>
                  
                  // <h3>Exponents</h3>
                  
                  // <p>Exponent is a mathematical operation, written as a<sup>n</sup>. Here the expression a<sup>n</sup> involves two numbers, the base 'a' and the exponent or power 'n'. <a href="https://www.cuemath.com/algebra/exponents/">Exponents</a> are used to simplify algebraic expressions. In this section, we are going to learn in detail about exponents including squares, cubes, <a href="https://www.cuemath.com/algebra/squares-and-square-roots/">square root</a>, and <a href="https://www.cuemath.com/algebra/cubes-and-cube-roots/">cube root</a>. The names are based on the powers of these exponents. The exponents can be represented in the form a<sup>n</sup> = a × a × a × ... n times.</p>
                  
                  // <h3>Logarithms</h3>
                  
                  // <p>The logarithm is the inverse function to exponents in algebra. <a href="https://www.cuemath.com/algebra/logarithms/">Logarithms</a> are a convenient way to simplify large algebraic expressions. The exponential form represented as a<sup>x</sup> = n can be transformed into logarithmic form as log<span class="MathJax_Preview" style="color: inherit;"></span><span id="MathJax-Element-1-Frame" class="mjx-chtml MathJax_CHTML" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><msub><mi></mi><mi>a</mi></msub></math>" role="presentation" style="font-size: 113%; position: relative;" data-lrn-mathjax-postprocessed="true"><span id="MJXc-Node-1" class="mjx-math" aria-hidden="true"><span id="MJXc-Node-2" class="mjx-mrow"><span id="MJXc-Node-3" class="mjx-msubsup"><span class="mjx-base"><span id="MJXc-Node-4" class="mjx-mi"><span class="mjx-char"></span></span></span><span class="mjx-sub" style="font-size: 70.7%; vertical-align: -0.212em; padding-right: 0.071em;"><span id="MJXc-Node-5" class="mjx-mi" style=""><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.224em; padding-bottom: 0.279em;">a</span></span></span></span></span></span><span class="MJX_Assistive_MathML" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi></mi><mi>a</mi></msub></math></span></span><script type="math/tex" id="MathJax-Element-1">_a</script>n = x. John Napier discovered the concept of Logarithms in 1614. Logarithms have now become an integral part of modern mathematics.</p>
                  
                  // <h3>Sets</h3>
                  
                  // <p>A <a href="https://www.cuemath.com/algebra/sets/">set</a> is a well-defined collection of distinct objects and is used to represent algebraic variables. The purpose of using sets is to represent the collection of relevant objects in a group. Example: Set A = {2, 4, 6, 8}..........(A set of even numbers), Set B = {a, e, i, o, u}......(A set of vowels).</p>
                  
                  // <div id="algform">
                  // <div id="circle" style="background-color: rgb(225, 255, 246);"></div><h2>Algebraic Formulas</h2>
                  // </div>
                  
                  // <p>An <a href="https://www.cuemath.com/algebra/algebraic-identities/">algebraic identity </a>is an equation that is always true regardless of the values assigned to the variables. Identity means that the left-hand side of the equation is identical to the right-hand side, for all values of the variables. These formulae involve squares and cubes of algebraic expressions and help in solving the algebraic expressions in a few quick steps. The frequently used algebraic formulas are listed below.</p>
                  
                  // <ul>
                  //   <li>(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></li>
                  //   <li>(a - b)<sup>2</sup> = a<sup>2</sup> - 2ab + b<sup>2</sup></li>
                  //   <li>(a + b)(a - b) = a<sup>2</sup> - b<sup>2</sup></li>
                  //   <li>(a + b + c)<sup>2 </sup>= a<sup>2</sup> + b<sup>2</sup> + c<sup>2</sup> + 2ab + 2bc + 2ca</li>
                  //   <li>(a + b)<sup>3</sup> = a<sup>3</sup> + 3a<sup>2</sup>b + 3ab<sup>2</sup> + b<sup>3</sup></li>
                  //   <li>(a - b)<sup>3</sup> = a<sup>3</sup> - 3a<sup>2</sup>b + 3ab<sup>2</sup> - b<sup>3</sup></li>
                  // </ul>
                  
                  // <p>Let us see the application of these formulas in algebra using the following example,</p>
                  
                  // <p><strong>Example: Using the (a + b)<sup>2</sup> formula in algebra, find the value of (101)<sup>2</sup>.</strong></p>
                  
                  // <p><strong>Solution:</strong></p>
                  
                  // <p>Given: (101)<sup>2</sup> = (100 + 1)<sup>2</sup><br>
                  // Using algebra formula (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>, we have,<br>
                  // (100 + 1)<sup>2</sup> = (100)<sup>2</sup> + 2(1)(100) + (1)<sup>2</sup><br>
                  // (101)<sup>2</sup> = 10201</p>
                  
                  // <p>For more formulas check the page of <a href="https://www.cuemath.com/algebra/algebraic-formulas/">algebraic formulas</a>, containing the formulas for expansion of algebraic expressions, exponents, and logarithmic formulas.</p>
                  
                  // <div id="operations">
                  // <div id="circle" style="background-color: rgb(225, 255, 246);"></div><h2>Algebraic Operations</h2>
                  // </div>
                  
                  // <p>The basic operations covered in algebra are addition, subtraction, multiplication, and division.</p>
                  
                  // <ul>
                  //   <li>Addition: For the addition operation in algebra, two or more expressions are separated by a plus (+) sign between them.</li>
                  //   <li>Subtraction: For the subtraction operation in algebra, two or more expressions are separated by a minus (-) sign between them.</li>
                  //   <li>Multiplication: For the multiplication operation in algebra, two or more expressions are separated by a multiplication (×) sign between them.</li>
                  //   <li>Division: For the division operation in algebra, two or more expressions are separated by a "/" sign between them.</li>
                  // </ul>
                  
                  // <div id="basic">
                  // <div id="circle" style="background-color: rgb(225, 255, 246);"></div><h2>Basic Rules and Properties of Algebra</h2>
                  // </div>
                  
                  // <p>The basic rules or properties of algebra for variables, algebraic expressions, or real numbers a, b and c are as given below,</p>
                  
                  // <ul>
                  //   <li><a href="https://www.cuemath.com/numbers/commutative-property/">Commutative Property</a> of Addition: a + b = b + a</li>
                  //   <li><a href="https://www.cuemath.com/numbers/commutative-property-of-multiplication/">Commutative Property of Multiplication</a>: a × b = b × a</li>
                  //   <li><a href="https://www.cuemath.com/numbers/associative-property-of-addition/">Associative Property of Addition</a>: a + (b + c) = (a + b) + c</li>
                  //   <li><a href="https://www.cuemath.com/numbers/associative-property-of-multiplication/">Associative Property of Multiplication</a>: a × (b × c) = (a × b) × c</li>
                  //   <li><a href="https://www.cuemath.com/numbers/distributive-property/">Distributive Property</a>: a × (b + c) = (a × b) + (a × c), or, a × (b - c) = (a × b) - (a × c)</li>
                  //   <li><a href="https://www.cuemath.com/numbers/reciprocal-definition/">Reciprocal</a>: Reciprocal of a = 1/a</li>
                  //   <li><a href="https://www.cuemath.com/numbers/additive-identity-property/">Additive Identity Property</a>: a + 0 = 0 + a = a</li>
                  //   <li><a href="https://www.cuemath.com/numbers/multiplicative-identity-property/">Multiplicative Identity Property</a>: a × 1 = 1 × a = a</li>
                  //   <li><a href="https://www.cuemath.com/numbers/additive-inverse/">Additive Inverse</a>: a + (-a) = 0</li>
                  // </ul>
                  
                  // <p><strong>☛ Related Topics:</strong></p>
                  
                  // <ul>
                  //   <li><a href="https://www.cuemath.com/algebra/algebra-1/">Algebra 1</a></li>
                  //   <li><a href="https://www.cuemath.com/algebra/addition-of-algebraic-expressions/">Addition of Algebraic Expressions</a></li>
                  //   <li><a href="https://www.cuemath.com/algebra/subtraction-of-algebraic-expressions/">Subtraction of Algebraic Expressions</a></li>
                  //   <li><a href="https://www.cuemath.com/algebra/multiplication-of-algebraic-expressions/">Multiplication of Algebraic Expressions</a></li>
                  //   <li><a href="https://www.cuemath.com/algebra/division-of-algebraic-expressions/">Division of Algebraic Expressions</a></li>
                  // </ul>
                  
                  // <p>Cuemath is one of the world's leading math learning platforms that offers LIVE 1-to-1 <a href="https://www.cuemath.com/">online math classes for grades K-12</a>. Our mission is to transform the way children learn math, to help them excel in school and competitive exams. Our expert tutors conduct 2 or more live classes per week, at a pace that matches the child's learning needs.</p>
                  // <div id="readMoreLess" class="readMoreLess">Read More</div></div>
                  // `
                  __html: topic.details
                }}
              > 
              </div>
            </>
            
            }

            {currentChapter === "Practise" && 
              <>
                <p className='text-2xl font-bold'>Practise</p>
              
                <div className='text-sm py-5'
                  dangerouslySetInnerHTML={{
                    __html: topic.practice
                  }}
                > 
                </div>
              </>
            }

            <div className='flex justify-center'>
              <div className={`
                        inline-flex items-center gap-2 px-6 py-2 
                        text-white font-bold ${finishedChapter.includes(currentChapter)? "bg-black" : "bg-sky-600"} 
                        rounded-md shadow-2xl text-sm
                        active:ring-4 ring-sky-300        
                  `}
                  onClick={() => !finishedChapter.includes(currentChapter) && setFinishedChapter([...finishedChapter, currentChapter])}
              >
                <FaCheckDouble className="text-white" />
                {finishedChapter.includes(currentChapter)? "Already Done" : "I am done"} 
              </div>
            </div>

          </div>

          <div className='lg:w-1/5 h-full p-5 space-y-5 sticky top-0'>

            <div className='rounded-md bg-sky-600 p-4 text-white'>
              <p className='text-3xl text-center font-bold'>
                {progress}%
              </p>
              <p className='text-center text-xs'>Reading Progress..</p>

              <div className='mt-5 relative h-2 bg-sky-400 rounded-full overflow-hidden'>
                <div 
                  style={{width: progress+'%'}} 
                  className='absolute top-0 left-0 h-full bg-white rounded-full'
                ></div>
              </div>
            </div>

            <div className='rounded-md bg-neutral-100 p-4'>
              <p className='text-3xl text-center font-bold'>
                {finishedChapter.length}/2
              </p>
              <p className='text-center text-xs'>Topics Covered</p>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}



export async function getServerSideProps(context){

  const baseURL = process.env.BASE_URL;
  const res = await fetch(baseURL+"/api/topics?id="+context.query.topic);
  const data = await res.json();
  
  return {
    props: {
      topic: data
    }
  }
}