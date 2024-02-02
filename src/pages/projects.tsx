import React, { Fragment, useState } from "react";
import { CreateProjectModel, Navbar, ProjectCard } from "@/features/projects";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import Head from "next/head";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <Head>
        <title>Projects</title>
      </Head>
      <main>
        <Navbar />

        <section className="p-5 lg:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Projects</h1>

            <Button onClick={() => setIsOpen(true)}>
              <IoAdd className="mr-2 shrink-0" size={25} />
              Create
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {items.map((item, index) => (
              <ProjectCard key={index} {...item} />
            ))}
          </div>
        </section>
      </main>

      <CreateProjectModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
};

export default Projects;

const items = [
  {
    name: "Accountability base",
    users: [
      {
        lastName: "Shawn",
        firstName: "Guzman",
      },
      {
        lastName: "Francisco",
        firstName: "Kennedy",
      },
      {
        lastName: "Jessie",
        firstName: "Mendoza",
      },
    ],
    createdAt: new Date(),
  },
  {
    name: "Accountability base",
    users: [
      {
        lastName: "Shawn",
        firstName: "Guzman",
      },
      {
        lastName: "Francisco",
        firstName: "Kennedy",
      },
      {
        lastName: "Jessie",
        firstName: "Mendoza",
      },
    ],
    createdAt: new Date(),
  },
  {
    name: "Accountability base",
    users: [
      {
        lastName: "Shawn",
        firstName: "Guzman",
      },
      {
        lastName: "Francisco",
        firstName: "Kennedy",
      },
      {
        lastName: "Jessie",
        firstName: "Mendoza",
      },
    ],
    createdAt: new Date(),
  },
  {
    name: "Accountability base",
    users: [
      {
        lastName: "Shawn",
        firstName: "Guzman",
      },
      {
        lastName: "Francisco",
        firstName: "Kennedy",
      },
      {
        lastName: "Jessie",
        firstName: "Mendoza",
      },
    ],
    createdAt: new Date(),
  },
];
