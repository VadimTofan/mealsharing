'use client';

import styles from '../page.module.scss';
import { useState, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from './AuthContext';
import Image from 'next/image';

export default function BurgerMenu() {
  const [state, setState] = useState({
    menuOpen: false,
    showLoginModal: false,
    showProfileMenu: false,
  });
  const [isMounted, setIsMounted] = useState(false);
  const { menuOpen, showLoginModal, showProfileMenu } = state;

  const { user, setUser, setToken } = useContext(AuthContext);
  const profileMenuRef = useRef(null);
  const pathname = usePathname();

  function toggleMenu() {
    setState((prev) => ({ ...prev, menuOpen: !prev.menuOpen }));
  }

  function handleNavClick() {
    setState((prev) => ({ ...prev, menuOpen: false, showProfileMenu: false }));
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    setState((prev) => ({ ...prev, showProfileMenu: false, menuOpen: false }));
  }

  function handleLoginSuccess(credentialResponse) {
    const token = credentialResponse.credential;
    setToken(token);
    setState((prev) => ({ ...prev, showLoginModal: false }));
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setState((prev) => ({ ...prev, showProfileMenu: false }));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function isCurrent(path) {
    return pathname === path ? styles.header__current : '';
  }

  return (
    <>
      <button
        className={`${styles.header__burger} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        type="button"
      >
        <span className={styles.header__line}></span>
        <span className={styles.header__line}></span>
        <span className={styles.header__line}></span>
      </button>

      <nav className={`${styles.header__navigation} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.header__list}>
          {pathname !== '/' && (
            <li className={styles.header__link}>
              <Link href="/" onClick={handleNavClick}>
                Home
              </Link>
            </li>
          )}
          <li className={`${styles.header__link} ${isCurrent('/meals')}`}>
            <Link href="/meals" onClick={handleNavClick}>
              Meals
            </Link>
          </li>

          {!user ? (
            <li className={styles.header__link}>
              <button
                className={styles.header__button}
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    showLoginModal: true,
                    menuOpen: false,
                  }))
                }
              >
                Log In
              </button>
            </li>
          ) : (
            <>
              <li className={`${styles.header__link} ${isCurrent('/orders')}`}>
                <Link href="/orders" onClick={handleNavClick}>
                  Orders
                </Link>
              </li>

              <li className={styles.header__profile} ref={profileMenuRef}>
                <button
                  type="button"
                  className={styles.header__avatarButton}
                  onClick={() =>
                    setState((prev) => ({ ...prev, showProfileMenu: !prev.showProfileMenu }))
                  }
                  aria-haspopup="true"
                  aria-expanded={showProfileMenu}
                  aria-label="Toggle profile menu"
                >
                  <Image
                    src={user.picture}
                    alt="Profile"
                    className={styles.header__image}
                    height={50}
                    width={50}
                  />
                </button>
                {showProfileMenu && (
                  <div className={styles.header__dropdown}>
                    <button type="button" onClick={handleLogout} className={styles.header__signout}>
                      Sign out
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
      {isMounted &&
        showLoginModal &&
        createPortal(
          <div className={styles.header__modal}>
            <div className={styles.header__modalContent}>
              <h2 className={styles.header__login}>Sign in with Google</h2>
              <div className={styles.header__google}>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.warn('Login Failed')}
                />
              </div>
              <button
                className={styles.header__cancel}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, showLoginModal: false }))}
              >
                Cancel
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
