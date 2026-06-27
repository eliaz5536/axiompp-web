'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { InlineMath } from "react-katex"

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const highlightCpp = (code: string) => {
  let html = escapeHtml(code)
  html = html.replace(/(\/\/.*?$)/gm, '<span class="token-comment">$1</span>')
  html = html.replace(/(".*?")/g, '<span class="token-string">$1</span>')
  html = html.replace(/\b(#include|template|struct|static|const|int|return|using|namespace|auto|typename|class|if|else|for|while|break|continue)\b/g, '<span class="token-keyword">$1</span>')
  html = html.replace(/\b(std::cout|std::endl|MatrixXd|Eigen|Identity|Factorial|main)\b/g, '<span class="token-function">$1</span>')
  html = html.replace(/\b([0-9]+)\b/g, '<span class="token-number">$1</span>')
  html = html.replace(/\b(MatrixXd|Eigen|std::vector|std::ostream|std::string)\b/g, '<span class="token-type">$1</span>')
  html = html.replace(/(&lt;.*?&gt;)/g, '<span class="token-preprocessor">$1</span>')
  return html
}

const highlightPython = (code: string) => {
  let html = escapeHtml(code)
  html = html.replace(/(#.*?$)/gm, '<span class="token-comment">$1</span>')
  html = html.replace(/(".*?"|'.*?')/g, '<span class="token-string">$1</span>')
  html = html.replace(/\b(import|from|as|def|return|if|else|elif|for|while|in|class|with|try|except|lambda|True|False|None)\b/g, '<span class="token-keyword">$1</span>')
  html = html.replace(/\b(sp|x|y|expr|simplified|equation|solutions|print|sympy|sp\.symbols|sp\.sin|sp\.cos|sp\.simplify|sp\.Eq|sp\.solve)\b/g, '<span class="token-function">$1</span>')
  html = html.replace(/\b([0-9]+(\.[0-9]+)?)\b/g, '<span class="token-number">$1</span>')
  return html
}

const highlightCode = (code: string, language: string) => {
  if (language === 'C++') return highlightCpp(code)
  if (language === 'Python') return highlightPython(code)
  return escapeHtml(code)
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 axiom-hero-bg" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_18%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-2xl hero-content">
              <span className="inline-block text-sm uppercase tracking-[0.36em] text-sky-300/80 mb-4 animate-fade-in" style={{animationDelay: '0.01s'}}>
                high-end mathematics Framework
              </span>
              <h1 className="text-5xl sm:text-6xl font-black leading-tight text-white animate-fade-in" style={{animationDelay: '0.02s'}}>
                Axiom++
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl animate-fade-in" style={{animationDelay: '0.03s'}}>
                A modern, high-performance C++ mathematics framework that blends expressive type-safe abstractions with blazing computation speed.
                Axiom++ unifies algebra, geometry, topology and analysis into a single coherent API for mathematicians and engineers.
              </p>
              <div className="mt-10 flex flex-wrap items-start gap-4 animate-fade-in" style={{animationDelay: '0.04s'}}>
                <Link
                  href="/documentation/getting-started"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                >
                  Get Started
                </Link>
                <Link
                  href="/documentation"
                  className="inline-flex items-center justify-center rounded-xl border border-sky-400/40 bg-white/5 px-7 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-300 hover:bg-sky-500/10"
                >
                  Documentation
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="manifold-card">
                <div className="manifold-grid" />
                <div className="manifold-glow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Domains */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-animate opacity-0">
        {/*<h2 className="text-4xl font-bold text-center mb-12">Mathematical Domains</h2>*/}
        <div className="flex items-center justify-center">
          {[
            {
              title: 'Type Theory',
              // description: 'Explore type systems, dependent types, and formal verification with advanced type-theoretic foundations',
              latex: '\\lambda x : A.\\ x',
              color: 'text-white-600 dark:text-white-400',
              hoverColor: 'hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20'
            },
            {
              title: 'Category Theory',
              // description: 'Study abstract structures, morphisms, and universal properties across different mathematical domains',
              latex: 'F : \\mathcal{C} \\to \\mathcal{D}',
              color: 'text-white-600 dark:text-white-400',
              hoverColor: 'hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20'
            },
            {
              title: 'Number Theory',
              // description: 'Analyze prime numbers, divisibility, modular arithmetic, and cryptographic applications',
              latex: '\\sum_{p\\ prime} \\frac{1}{p}',
              color: 'text-white-600 dark:text-white-400',
              hoverColor: 'hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/20'
            },
            {
              title: 'Abstract Algebra',
              // description: 'Work with groups, rings, fields, modules, and other algebraic structures and their properties',
              latex: 'G \\triangleleft H',
              color: 'text-white-600 dark:text-white-400',
              hoverColor: 'hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20'
            },
            {
              title: 'Differential Geometry',
              //description: 'Study manifolds, curvature, differential forms, and geometric properties of smooth spaces',
              latex: '\\int_m \\omega',
              color: 'text-white-600 dark:text-white-400',
              hoverColor: 'hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20'
            },
            {
              title: 'Statistics & Probability',
              // description: 'Perform statistical analysis, probability distributions, and data-driven mathematical modeling',
              latex: 'P(A \\mid B)',
              color: 'text-white-600 dark:text-white-400',
              hoverColor: 'hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/20'
            }
          ].map((domain, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`relative overflow-visible p-6 transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-1 ${domain.color} ${domain.hoverColor}`}
              >
                {/* Floating latex */}
                <motion.div
                  /*
                  initial={{ opacity: 0, y: 10 }} 
                  whileHover={{ opacity: 1, y: -10 }}
                  transition={{ duration: 0.25 }} 
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-lg pointer-events-none"
                  */
                  className="absolute -top-10 left-1/2 -translate-x-1/2 text-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div
                    className="
                      transform
                      scale-90
                      blur-[0px]

                      group-hover:scale-100
                      group-hover:-translate-y-2
                      group-hover:blur-0

                      transition-all
                      duration-300

                      drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]
                    ">
                    <InlineMath math={domain.latex}/>
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2">{domain.title}</h3>
              </div>
              {i < 5 && (
                <div className="h-16 w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples Section */}
      <section
        id="code-examples"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-animate opacity-0"
      >
        <div className="space-y-8">
          {[
            {
              language: 'C++',
              title: 'Template Metaprogramming',
              description: 'Advanced compile-time computation using C++ templates for mathematical structures and algorithms.',
              code: `#include <iostream>
#include <vector>

template<int N>
struct Factorial {
    static const int value = N * Factorial<N-1>::value;
};

template<>
struct Factorial<0> {
    static const int value = 1;
};

int main() {
    std::cout << "5! = " << Factorial<5>::value << std::endl;
    return 0;
}`,
              gradient: 'hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10'
            },
            {
              language: 'Python',
              title: 'Symbolic Mathematics',
              description: 'Using SymPy for symbolic computation, equation solving, and mathematical analysis.',
              code: `import sympy as sp
# Define symbols
x, y = sp.symbols('x y')

# Create expressions
expr = sp.sin(x)**2 + sp.cos(x)**2
simplified = sp.simplify(expr)

# Solve equations
equation = sp.Eq(x**2 - 4, 0)
solutions = sp.solve(equation, x)

print(f"Simplified: {simplified}")
print(f"Solutions: {solutions}")`,
              gradient: 'hover:bg-gradient-to-r hover:from-green-500/10 hover:to-teal-500/10'
            },
            {
              language: 'C++',
              title: 'Linear Algebra Operations',
              description: 'Efficient matrix operations and linear algebra computations using Eigen library.',
              code: `#include <Eigen/Dense>
#include <iostream>

int main() {
    using namespace Eigen;

    // Create matrices
    MatrixXd A(3, 3);
    A << 1, 2, 3,
         4, 5, 6,
         7, 8, 9;

    MatrixXd B = MatrixXd::Identity(3, 3);

    // Matrix operations
    MatrixXd C = A * B;
    MatrixXd D = A.inverse();

    std::cout << "A * B =\\n" << C << std::endl;
    std::cout << "A^-1 =\\n" << D << std::endl;

    return 0;
}`,
              gradient: 'hover:bg-gradient-to-r hover:from-red-500/10 hover:to-orange-500/10'
            }
          ].map((example, i) => (
            <div
              key={i}
              className={`flex flex-col lg:flex-row bg-gray-900 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 ${example.gradient} hover:shadow-2xl`}
            >
              {/* Code Section */}
              <div className="flex-1 p-6">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm font-mono">
                    {example.language}
                  </span>
                  <h3 className="ml-4 text-lg font-semibold text-white">{example.title}</h3>
                </div>
                <pre className="text-sm leading-relaxed">
                  <code
                    className={example.language === 'Python' ? 'language-python text-gray-100' : 'language-cpp text-gray-100'}
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(example.code, example.language),
                    }}
                  />
                </pre>
              </div>

              {/* Description Section */}
              <div className="lg:w-1/3 p-6 bg-gray-800/50 border-t lg:border-t-0 lg:border-l border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-3">About this example</h4>
                <p className="text-gray-300 leading-relaxed">{example.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navbar */}
      <Footer />
    </div>
  );
}
