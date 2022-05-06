import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdNavigateNext } from "react-icons/md";


const BreadCrumbs = () => {
  const router = useRouter()
  console.log('pathname',router.pathname)
  console.log('asPath',router.asPath)
  return (
    <nav className="flex text-3xl" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/category-menu"
            className="inline-flex items-center hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ประเภทเมนู
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <MdNavigateNext />
            <a
              href="#"
              className="ml-1  hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              เมนู
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <MdNavigateNext />
            <span className="ml-1  md:ml-2 dark:text-gray-500">
              พรีเซ็ท
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
