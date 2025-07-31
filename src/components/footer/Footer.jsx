import React from 'react'
import { StyledFooter } from './styled.Footer'

export default function Footer() {
  return (
    <footer className="text-center py-8 mt-12">
      <div className="glass rounded-full px-6 py-4 inline-block">
        <p className="text-white/80">
          Feito com ❤️ por{' '}
          <a
            href="https://github.com/ElBotechia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-semibold"
          >
            @ElBotechia
          </a>
        </p>
      </div>
    </footer>
  )
}
