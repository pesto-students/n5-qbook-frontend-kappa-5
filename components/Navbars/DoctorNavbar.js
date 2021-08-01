import { Avatar } from "@material-ui/core";

export default function DoctorNavbar() {
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between sm:flex-row-reverse md:flex-row-reverse md:flex-nowrap flex-wrap md:px-10 px-4">
          <p className="text-white text-sm uppercase mb-5 lg:mb-0 lg:inline-block font-semibold">
            Dashboard
          </p> 
          <div className="flex right-0 flex-wrap items-stretch">
          <Avatar className="cursor-pointer" src="">
                </Avatar>
            </div>     
        </div>
      </nav>
    </>
  );
}
