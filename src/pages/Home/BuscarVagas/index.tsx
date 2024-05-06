import Header from "@/components/Header";
import Search from "@/components/Search";
import { SelectD } from "@/components/SelectItem";
import Footer from "@/components/footer";
import Vagas from "@/components/vagas";

const BuscarVagas = () => {
  return (
    <div className="">
      <Header />
      <div className="flex justify-center py-8 bg-gradient-to-tr from-[#73C1E3] to-[#008DC9]">
        <Search />
      </div>
      <div className="px-[15%]">
        <div className="flex justify-between items-center mt-7 mb-4">
          <p className="font-normal text-xl">4 vagas de estágio disponiveis</p>
          <SelectD />
        </div>
        <hr />
        <div className="mt-5">
          <Vagas />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuscarVagas;
