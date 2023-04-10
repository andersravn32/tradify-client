import Button from "../components/ui/Button";

function Index() {
  return (
    <>
      <div className="h-screen grid place-items-center">
        <div className="container w-full grid grid-cols-3 items-center gap-4">
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl">Forbinder mennesker forsimpler handler</h1>
            <p className="text-zinc-400">
              Tradify er den enkle og sikre måde at handle med andre
              privatpersoner online. Med vores mellemmands service, kan du købe
              og sælge med tillid og ro i sindet.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button type="primary" size="md">
                Opret konto
              </Button>
              <Button type="secondary" size="md">
                Se fordelene
              </Button>
            </div>
          </div>

          <div className="col-span-2 bg-zinc-800 aspect-video"></div>
        </div>
      </div>
    </>
  );
}

export default Index;
