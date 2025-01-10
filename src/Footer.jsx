
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center mt-3">
      &copy; {currentYear} Omar Jaber
    </footer>
  );
};

export default Footer;
