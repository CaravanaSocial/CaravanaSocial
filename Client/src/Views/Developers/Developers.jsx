import micaela from "../../assets/images/micaela.jpg";
import cesar from "../../assets/images/cesar.jpg";
import enzo from "../../assets/images/enzo.jpg";
import jeferson from "../../assets/images/jeferson.jpg";
import ken from "../../assets/images/ken.jpg";
import juan from "../../assets/images/juan.jpg";
import alejandro from "../../assets/images/alejandro.jpg";
import caro from "../../assets/images/caro.jpg";
import { Link } from "react-router-dom";

import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

import React from "react";
function Index() {
  return (
    <div>
      <div className="container flex justify-center mx-auto pt-16">
        <div>
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            EQUIPO DE DESAROLLO
          </h1>
        </div>
      </div>
      <div className="w-full bg-gray-100 px-10 pt-10">
        <div className="container mx-auto">
          <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={micaela}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Elizabeth Micaela Gurdzel
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/elizabethMica"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/elizabeth-micaela-gurdzel-9441a2268/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={juan}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Juan Camilo Cabezas Galvis
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/CamiloCabezas"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/juan-camilo-cabezas-galvis-3989a1265/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={alejandro}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Manuel Alejandro Marapacuto Perez
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/AlejandroMarapacuto"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/alejandro-perez-1ab7bb267/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5 ">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={jeferson}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Jefferson Baldión Beltrán
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/JeffersonBaldion"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/jeffersonbaldion/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={micaela}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Bogdan Andrei Faur
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/Bogdan-Andrei-Faur"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/bogdan-andrei-faur-147316172/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={cesar}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Cesar Antonio Baron Rivas
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/CesarABaron"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/cesar-baron-7aa3aa270/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={ken}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Ken Rodrigo Ariel Miyagi
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link target="_blank" to="https://github.com/KenMiyagi">
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/ken-rodrigo-ariel-miyagi-18982619a/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={enzo}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Enzo Gabriel Passarino
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Full Stack Developer
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/PassarinoEnzo"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/enzo-passarino/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={caro}
                      alt
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="font-bold text-3xl text-center pb-1">
                    Carolina Tobar Jaramillo
                  </div>
                  <p className="text-gray-800 text-sm text-center">
                    Henry Mentor
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://github.com/carotobarj"
                        >
                          <AiFillGithub size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <div>
                        <Link
                          target="_blank"
                          to="https://www.linkedin.com/in/carolina-tobar-jaramillo/"
                        >
                          <AiFillLinkedin size={24} />{" "}
                        </Link>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
