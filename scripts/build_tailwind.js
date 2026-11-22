const path = require('path');
const fs = require('fs');

const projectRoot = 'c:/PROJECT/EncodeUnlimitedWeb_Rewamp';
const tailwind = require(path.join(projectRoot, 'node_modules/tailwindcss'));
const postcss = require(path.join(projectRoot, 'node_modules/postcss'));

const files = [
  'index.html',
  'about.html',
  'blog.html',
  'careers.html',
  'case-studies.html',
  'contact.html',
  'portfolio.html',
  'services.html',
  'technologies.html',
  'assets/js/main.js'
];

const rawContents = files.map(f => ({
  raw: fs.readFileSync(path.join(projectRoot, f), 'utf8'),
  extension: f.endsWith('.js') ? 'js' : 'html'
}));

const config = {
  darkMode: 'class',
  content: rawContents,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          lime: '#7edc05',
          emerald: '#22c55e',
          dark: '#000000',
        }
      }
    }
  },
  plugins: []
};

const inputCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .group:hover .group-hover\\:shadow-\\[0_0_20px_rgba\\(126\\,220\\,5\\,0\\.25\\)\\] {
    box-shadow: 0 0 20px rgba(126, 220, 5, 0.25);
  }
  .group:hover .group-hover\\:shadow-\\[0_0_30px_rgba\\(126\\,220\\,5\\,0\\.3\\)\\] {
    box-shadow: 0 0 30px rgba(126, 220, 5, 0.3);
  }
  .group:hover .group-hover\\:shadow-\\[0_0_15px_rgba\\(126\\,220\\,5\\,0\\.4\\)\\] {
    box-shadow: 0 0 15px rgba(126, 220, 5, 0.4);
  }
  .group:hover .group-hover\\:shadow-\\[0_0_15px_rgba\\(126\\,220\\,5\\,0\\.3\\)\\] {
    box-shadow: 0 0 15px rgba(126, 220, 5, 0.3);
  }
  .group:hover .group-hover\\:shadow-\\[0_0_18px_rgba\\(126\\,220\\,5\\,0\\.5\\)\\] {
    box-shadow: 0 0 18px rgba(126, 220, 5, 0.5);
  }
  .shadow-\\[0_0_25px_rgba\\(126\\,220\\,5\\,0\\.35\\)\\] {
    box-shadow: 0 0 25px rgba(126, 220, 5, 0.35);
  }
  .shadow-\\[0_0_25px_rgba\\(126\\,220\\,5\\,0\\.15\\)\\] {
    box-shadow: 0 0 25px rgba(126, 220, 5, 0.15);
  }
  .shadow-\\[0_0_15px_rgba\\(126\\,220\\,5\\,0\\.2\\)\\] {
    box-shadow: 0 0 15px rgba(126, 220, 5, 0.2);
  }
  .shadow-\\[0_0_20px_rgba\\(126\\,220\\,5\\,0\\.2\\)\\] {
    box-shadow: 0 0 20px rgba(126, 220, 5, 0.2);
  }
  .shadow-\\[0_0_50px_rgba\\(126\\,220\\,5\\,0\\.15\\)\\] {
    box-shadow: 0 0 50px rgba(126, 220, 5, 0.15);
  }
  .hover\\:shadow-\\[0_0_30px_rgba\\(126\\,220\\,5\\,0\\.6\\)\\]:hover {
    box-shadow: 0 0 30px rgba(126, 220, 5, 0.6);
  }
  .drop-shadow-\\[0_0_12px_rgba\\(126\\,220\\,5\\,0\\.8\\)\\] {
    filter: drop-shadow(0 0 12px rgba(126, 220, 5, 0.8));
  }
  .drop-shadow-\\[0_4px_18px_rgba\\(37\\,211\\,102\\,0\\.65\\)\\] {
    filter: drop-shadow(0 4px 18px rgba(37, 211, 102, 0.65));
  }
  .w-4\\.5 { width: 1.125rem; }
  .h-4\\.5 { height: 1.125rem; }
  .\\[mask-image\\:linear-gradient\\(to_right\\,transparent\\,black_6\\%\\,black_94\\%\\,transparent\\)\\] {
    mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  }
  .\\[-webkit-mask-image\\:linear-gradient\\(to_right\\,transparent\\,black_6\\%\\,black_94\\%\\,transparent\\)\\] {
    -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  }
  .hover\\:pause:hover {
    animation-play-state: paused;
  }
}
`;

postcss([tailwind(config)])
  .process(inputCss, { from: undefined })
  .then(res => {
    let minified = res.css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([\{\}\:\;\,])\s*/g, '$1')
      .replace(/\;}/g, '}')
      .trim();

    fs.writeFileSync(path.join(projectRoot, 'assets/css/tailwind.min.css'), minified, 'utf8');
    console.log('Successfully generated tailwind.min.css! Length:', minified.length, 'bytes');
  })
  .catch(err => console.error(err));
