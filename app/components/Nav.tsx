"use client";
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {Bars3Icon, ShoppingCartIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {redirect, usePathname, useRouter} from "next/navigation";
import Link from 'next/link';
import {logout,selectAuth} from "@/lib/features/auth/authSlice";
import {clearCart,selectItem} from "@/lib/features/carts/CartSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const navigation = [
    {"name": "home", "pathName": "/", "href": "/"},
    {"name": "album", "pathname": "/albums", "href": "/albums"},
    {"name": "services", "pathname": "/services", "href": "/#services"}
];
export const Nav = () => {
    const pathname = usePathname();
    const router = useRouter();
    const cartItem = useAppDispatch(selectItem);
    const dispatch = useAppDispatch();
    // Authentication Parth
    const goToCard = () => {
        // isAuth()
        router.push('/cart');
    };
    if (pathname == "/login") {
        return null;
    }
    const goLogout = () => {
        console.log("work")
        console.log("Item:,",cartItem.length)
        dispatch(logout());
        dispatch(clearCart());
        router.push('./')
    };
    return (
        <Disclosure as="nav"
                    className="bg-slate-50/[0.5] text-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 sticky top-0 z-50 transition-all duration-300 delay-300">
            {/*Main Menu*/}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile Navigation*/}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton
                            className="transition-all duration-300 delay-300 group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                    {/*Desktop Navigation*/}
                    <div className="flex flex-1  items-center justify-center sm:items-stretch sm:justify-between ">
                        <div
                            className="flex shrink-0 items-center sm:me-auto  font-bold font-mono hover:bg-zinc-300/[0.3] hover:p-2 transition-all duration-300 rounded  ">
                            SoundScape
                        </div>
                        <div className="hidden sm:ml-6 sm:block my-auto md:me-auto">
                            <div className="flex space-x-4 me-3">
                                {
                                    navigation.map((item) => (
                                        <Link key={item.name}
                                              href={item.href}
                                              className={"text-gray-500 hover:bg-black hover:text-white px-4 hover:px-3 hover:font-semibold font-mono transition-all duration-300 rounded "}
                                        >
                                            {item.name.toUpperCase()}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {/*Cart + Profile*/}
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="transition-all duration-300 relative rounded-lg me-3 hover:bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                            onClick={goToCard}
                        >
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon aria-hidden="true" className="size-6"/>
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className=" ml-3 relative md:flex hidden">
                            <div>
                                <MenuButton
                                    className="relative flex rounded-md bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800  ">
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="size-8 rounded-md"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none "
                                    >
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none "
                                    >
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        onClick={()=>(goLogout())}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none "
                                    >
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden transition-all duration-300 delay-300 ease-in-out border-b-2">
                {
                    navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={('text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium  hover:px-3 hover:font-semibold font-mono transition-all duration-300 ease-in-out rounded mx-3 hover:mx-5')}>
                            {item.name.toUpperCase()}
                        </Link>
                    ))
                }
            </DisclosurePanel>
        </Disclosure>
    )
};
