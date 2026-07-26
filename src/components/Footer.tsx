const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-secondary/15 px-5 py-8 text-center text-sm text-light/58">
      <p>
        &copy; {new Date().getFullYear()} Stefano Christian Wiryana. Built with
        Next.js, TypeScript, Tailwind CSS, and a security-first eye.
      </p>
    </footer>
  );
};

export default Footer;
