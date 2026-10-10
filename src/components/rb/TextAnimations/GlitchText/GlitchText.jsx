'use client';

/**
 * GlitchText — huruf bergetar dengan dua salinan ber-shadow (efek glitch).
 * Ukuran font TIDAK ditentukan di sini — biarkan pemakai memberi kelas ukuran
 * (mis. text-3xl) supaya teks tidak pernah overflow dan terpotong di kartu.
 * Warna shadow: crimson lembut + emas champagne (senada palet premium).
 */
const GlitchText = ({ children, speed = 0.5, enableShadows = true, enableOnHover = false, className = '' }) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-3px 0 #c94f4f' : 'none',
    '--before-shadow': enableShadows ? '3px 0 #ddc38f' : 'none',
  };

  const baseClasses = 'text-white font-black relative select-none cursor-pointer leading-none';

  const pseudoClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[4px] after:text-white after:bg-[#0a0a0b] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-4px] before:text-white before:bg-[#0a0a0b] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'
    : "after:content-[''] after:absolute after:top-0 after:left-[4px] after:text-white after:bg-[#0a0a0b] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-4px] before:text-white before:bg-[#0a0a0b] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before';

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <div style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </div>
  );
};

export default GlitchText;
