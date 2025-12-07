import React, { useEffect, useRef, useState } from 'react'
import MainLogo from './MainLogo'
import SigninButton from './SigninButton'
import HamburgerMenu from './HamburgerMenu'
import MainSearch from './MainSearch'
import SmallMenu from './SmallMenu'
import { MainNavProvider } from '~/context/MainNavContext'
import { AuthProvider } from '~/context/AuthContext'

interface UseScrollThresholdOptions {
    threshold?: number; // Scroll position in pixels
    delay?: number; // Debounce delay in ms
}

function useScrollThreshold(options: UseScrollThresholdOptions = {}): boolean {
    const { threshold = 0, delay = 150 } = options;
    const [isOverThreshold, setIsOverThreshold] = useState<boolean>(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollY = window.scrollY;
            const crossedThreshold = currentScrollY > threshold;

            setIsOverThreshold(crossedThreshold);

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Optional: Add delay for performance if needed
            scrollTimeout.current = setTimeout(() => {
                // Update state after scroll stops (optional)
            }, delay);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        handleScroll();

        return (): void => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [threshold, delay]);

    return isOverThreshold;
}

const MainNav = () => {
    const isOverThreshold = useScrollThreshold({ delay: 100 });
    return (
        <div>
            <MainNavProvider>
                <AuthProvider>
                    <div className={`w-full h-[60px] border-b border-b-gray-200 fixed left-0 top-0 right-0 z-[100] bg-white ${isOverThreshold && ' shadow-lg'} transition-all duration-1000 ease-in-out`}>
                        <div className={`max-w-[98%] h-full mx-auto w-full flex place-items-center place-content-around gap-4 relative `}>
                            {/** hamburger */}
                            <HamburgerMenu />

                            {/**logo */}
                            <MainLogo />

                            {/** search */}
                            <MainSearch />

                            {/** small menu */}
                            <SmallMenu />

                            {/** short menu */}
                            {/** signin button */}
                            <SigninButton />
                        </div>
                    </div>
                    <div className={`h-[60px]`}></div>
                </AuthProvider>
            </MainNavProvider>
        </div>
    )
}

export default MainNav
