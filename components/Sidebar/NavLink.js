import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({hrefLink,hrefText,icon}) {
    const router = useRouter();
    return (
        <>
           <li className="items-center">
                <Link href={hrefLink}>
                  <a  href={hrefLink}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf(`${hrefLink}`) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i  className={`fas ${icon} mr-2 text-sm ` +
                        (router.pathname.indexOf(`${hrefLink}`) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    {hrefText} 
                  </a>
                </Link>
              </li>  
        </>
    )
}

export default NavLink
