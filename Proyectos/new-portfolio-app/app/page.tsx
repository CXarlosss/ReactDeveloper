
import Hero from './Hero';
export default function Home() {
  return (
   <>

   <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
    <div className="max-w-7xl w-full">
      <Hero/>
      <h1 className="text-2xl font-bold">
        Hello Carlos!!
        </h1>
    </div>
   </main>
   </>
  );
}
