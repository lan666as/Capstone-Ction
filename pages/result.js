import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import backgroundImage from '../public/background-image.jpg';

const healthFacilityDataYogya = [
  {
    id: 1,
    hospitalName: 'Rumah Sakit PKU Muhammadiyah Yogyakarta',
  },
  {
    id: 2,
    hospitalName: 'Rumah Sakit Panti Rapih',
  },
  {
    id: 3,
    hospitalName: 'Rumah Sakit Bethesda Yogyakarta',
  },
  {
    id: 4,
    hospitalName: 'Rumah Sakit Pratama',
  },
  {
    id: 5,
    hospitalName: 'Rumah Sakit Siloam',
  },
  {
    id: 5,
    hospitalName: 'Rumah Sakit DKT Dr Soetarto',
  }
];

const clasificationData = {
  Mild : {
    name : "Ringan",
    recommendation : "Isolasi Mandiri di Rumah",
  },
  Moderate : {
    name : "Sedang",
    recommendation : "Mengunjungi Fasilitas Kesehatan",
  },
  Severe : {
    name : "Berat",
    recommendation : "Mengunjungi Fasilitas Kesehatan",
  },
}

const ResultPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const maxClass = router.query.Mild ? Object.keys(router.query).reduce((a, b) => router.query[a] > router.query[b] ? a : b) : 'Mild';

  const closeModal = () => {
    // redirect to userlanding
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="fixed h-screen w-screen overflow-hidden -z-10">
        <Image
          alt="Hero Background"
          src={backgroundImage}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="m-0 text-center pt-[15vh]">
        <h1 className="font-bold text-3xl mb-28">Hasil Klasifikasi</h1>
        <p className="text-[#5072B8] text-2xl font-extrabold mb-16">
          Gejala {clasificationData["Mild"]["name"]}
        </p>
        <p className="text-[#5072B8] text-2xl font-extrabold mb-4">
          Rekomendasi:
        </p>
        <p className="text-[#023047] text-2xl font-medium mb-20">
          {clasificationData["Mild"]["recommendation"]}
        </p>
      </div>

      <button
        className="primary-button block mx-auto"
        onClick={() => openModal()}
      >
        Lihat Fasilitas Kesehatan
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl min-h-[500px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-4xl bg-[#284F63] text-[#FCD8B0] font-bold text-center px-2 py-4"
                  >
                    Fasilitas Kesehatan Kota Yogyakarta
                  </Dialog.Title>
                  <div className="mt-2 px-6 py-8">
                    <ul className="list-disc list-inside pl-9 -indent-9">
                      {healthFacilityDataYogya.map((data, index) => (
                        <li
                          key={data.id}
                          className={
                            index === healthFacilityDataYogya.length - 1
                              ? 'text-[#284F63] font-bold text-3xl'
                              : 'text-[#284F63] font-bold text-3xl mb-4'
                          }
                        >
                          {data.hospitalName}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button 
                      type="button"
                      className="bg-[#5072B8] text-white px-8 py-1 text-center rounded-2xl font-bold mx-auto mb-4 flex justify-center"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ResultPage;
