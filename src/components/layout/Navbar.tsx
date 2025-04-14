
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Dashboard', path: '/dashboard' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const authStatus = localStorage.getItem('safyra_auth') === 'true';
    setIsLoggedIn(authStatus);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('safyra_auth');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="group">
          <Logo className="h-12 w-auto group-hover:animate-rotate-slow transition-all" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={isLoggedIn || item.path === '/' ? item.path : '/login'}
              className={`nav-link ${location.pathname === item.path ? 'active-nav-link' : ''} ${
                item.name === 'Dashboard' ? 'flex items-center border border-safyra-gold px-4 py-1.5 rounded-md hover:bg-safyra-gold/10' : ''
              }`}
              onClick={(e) => {
                if (!isLoggedIn && item.path !== '/') {
                  e.preventDefault();
                  toast.error('Please log in to access this page');
                  navigate('/login');
                }
              }}
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-safyra-navy hover:text-safyra-gold"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          ) : (
            <Link
              to="/login"
              className="cta-button"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-safyra-navy"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={isLoggedIn || item.path === '/' ? item.path : '/login'}
                className={`nav-link text-center py-2 ${location.pathname === item.path ? 'active-nav-link' : ''}
                  ${item.name === 'Dashboard' ? 'border border-safyra-gold rounded-md' : ''}`}
                onClick={(e) => {
                  if (!isLoggedIn && item.path !== '/') {
                    e.preventDefault();
                    toast.error('Please log in to access this page');
                    navigate('/login');
                  }
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Button
                variant="ghost"
                className="flex items-center justify-center gap-2 text-safyra-navy hover:text-safyra-gold"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            ) : (
              <Link
                to="/login"
                className="cta-button text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
