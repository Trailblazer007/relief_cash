import React from "react";
import Image from "next/image";
import Script from "next/script";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";

const Projects = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="p-6 mb-10 flex items-center justify-between border-b-2 border-black">
        {/* logo */}
        <div>
          <Image src="/logo.png" height={90} width={73} alt="logo image" />
        </div>

        {/* search input */}
        <div className="flex justify-between gap-4 items-center">
          <IoMdSearch />

          <input
            type="text"
            placeholder="search for projects, member, or files"
          />
        </div>

        {/* right side */}
        <div className="flex gap-8 text-xl items-center justify-between">
          <div>
            <CiMail />
          </div>
          <div>
            <IoIosNotificationsOutline />
          </div>
          <div>
            <CiUser />
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-6">
        {/* Project header */}
        <div className="mb-10 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <h2>Projects</h2>
          </div>

          <button
            className="flex justify-between items-center gap-2 bg-green-400 font-bold p-4 px-8 text-white rounded-full hover:bg-green-600"
            type="button"
          >
            <span>
              <FaPlus />
            </span>
            <span>Create</span>
          </button>
        </div>

        {/* Projects  */}
        <div className=" grid grid-cols-3  gap-y-10 px-6">
          {/* card 1 */}
          <div className="shadow-xl  rounded-md w-80 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Beta Feature Release</h3>
                <p className="text-sm text-gray-400">2h Ago</p>
              </div>

              <div>
                <FaEllipsisVertical />
              </div>
            </div>

            <div className=" flex justify-between items-center">
              <div>
                {/* card bottom left */}
                <div className="flex items-center justify-between">
                  <div>
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <p>2 Feb</p>
                  </div>
                </div>

                {/* card bottom right */}
                <div className="flex items-center">
                  <div>
                    <Image
                      className="h-[50%] aspect-square rounded-[50%]"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card 2 */}
          <div className="shadow-xl rounded-md w-80 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Beta Feature Release</h3>
                <p className="text-sm text-gray-400">2h Ago</p>
              </div>

              <div>
                <FaEllipsisVertical />
              </div>
            </div>

            <div className=" flex justify-between items-center">
              <div>
                {/* card bottom left */}
                <div className="flex items-center justify-between">
                  <div>
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <p>2 Feb</p>
                  </div>
                </div>

                {/* card bottom right */}
                <div className="flex items-center">
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card 3 */}
          <div className="shadow-xl rounded-md w-80 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Beta Feature Release</h3>
                <p className="text-sm text-gray-400">2h Ago</p>
              </div>

              <div>
                <FaEllipsisVertical />
              </div>
            </div>

            <div className=" flex justify-between items-center">
              <div>
                {/* card bottom left */}
                <div className="flex items-center justify-between">
                  <div>
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <p>2 Feb</p>
                  </div>
                </div>

                {/* card bottom right */}
                <div className="flex items-center">
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card 4 */}
          <div className="shadow-xl rounded-md w-80 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Beta Feature Release</h3>
                <p className="text-sm text-gray-400">2h Ago</p>
              </div>

              <div>
                <FaEllipsisVertical />
              </div>
            </div>

            <div className=" flex justify-between items-center">
              <div>
                {/* card bottom left */}
                <div className="flex items-center justify-between">
                  <div>
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <p>2 Feb</p>
                  </div>
                </div>

                {/* card bottom right */}
                <div className="flex items-center">
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card 5 */}
          <div className="shadow-xl rounded-md w-80 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Beta Feature Release</h3>
                <p className="text-sm text-gray-400">2h Ago</p>
              </div>

              <div>
                <FaEllipsisVertical />
              </div>
            </div>

            <div className=" flex justify-between items-center">
              <div>
                {/* card bottom left */}
                <div className="flex items-center justify-between">
                  <div>
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <p>2 Feb</p>
                  </div>
                </div>

                {/* card bottom right */}
                <div className="flex items-center">
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card 6 */}
          <div className="shadow-xl rounded-md w-80 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Beta Feature Release</h3>
                <p className="text-sm text-gray-400">2h Ago</p>
              </div>

              <div>
                <FaEllipsisVertical />
              </div>
            </div>

            <div className=" flex justify-between items-center">
              <div>
                {/* card bottom left */}
                <div className="flex items-center justify-between">
                  <div>
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <p>2 Feb</p>
                  </div>
                </div>

                {/* card bottom right */}
                <div className="flex items-center">
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/user1.avif"
                      height={50}
                      width={50}
                      alt="user image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
