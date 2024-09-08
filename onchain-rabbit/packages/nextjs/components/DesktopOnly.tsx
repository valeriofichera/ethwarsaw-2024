"use client";

export const DesktopOnly = () => {


  return (
    <>

        <div className="fixed inset-0 w-screen h-screen bg-background flex justify-center items-center z-40 cursor-pointer lg:hidden">
          <div className="p-4 rounded-lg relative text-center z-50 cursor-default flex flex-col items-center">
                <h1 className="text-xl font-bold pb-1">desktop only</h1>
                <h2 className="text-sm text-slate-400">
                  <span className="text-sm text-slate-400">Funny.Money</span> only supports desktop
                </h2>
                <p className="text-xs mt-1">
                  switch to a larger screen
                </p>
          </div>
        </div>
    </>
  );
};
