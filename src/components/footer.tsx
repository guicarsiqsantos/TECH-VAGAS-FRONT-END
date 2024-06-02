import imglogo from "../assets/images/logo_fatec_white.png";
import imgcps from "../assets/images/logo_cps-white.png";
import imggov from "../assets/images/logo_govsp_white.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const Footer = () => {
  return (
    <div className=" flex flex-col w-full justify-between pt-10 h-[340px] bg-[#1470C4] bottom-0">
      <div className="flex gap-20 px-[15%]">
        <div className="flex flex-col">
          <img src={imglogo} alt="" width="150px" height="150px" />
          <h1 className="text-[#FFFFFF] w-[80%]">
            Rua Vicente Leporace, 2630, Jd. TrianonCEP 15703-116, Jales/SP -
            Brasil
          </h1>
          <div className="flex mt-3 items-center">
            <WhatsAppIcon className="text-[#FFFFFF] mr-1" />
            <h1 className="text-[#FFFFFF]">17 99676-2867</h1>
          </div>
          <div className="flex mt-3 items-center">
            <PhoneIcon className="text-[#FFFFFF] mr-1" />
            <h1 className="text-[#FFFFFF]">(17) 3621 6911</h1>
          </div>
          <div className="flex mt-3 items-center">
            <PermPhoneMsgIcon className="text-[#FFFFFF] mr-1" />
            <h1 className="text-[#FFFFFF]">17 99676-2867</h1>
          </div>
          <div className="flex mt-3 items-center">
            <AttachEmailIcon className="text-[#FFFFFF] mr-1" />
            <h1 className="text-[#FFFFFF]">fatecjales@fatecjales.edu.br</h1>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-[#FFFFFF]">Curso</h1>
          <h1 className="mt-3 text-[#FFFFFF]">Agronegócio</h1>
          <h1 className="mt-2 text-[#FFFFFF]">
            Análise e Desenvolvimento de Sistemas
          </h1>
          <h1 className="mt-2 text-[#FFFFFF]">Gestão Empresarial</h1>
          <h1 className="mt-2 text-[#FFFFFF]">Sistemas para Internet</h1>
        </div>
        <div className="flex gap-3 flex-col">
          <img src={imglogo} alt="" width="150px" height="150px" />
          <img src={imgcps} alt="" width="100px" height="100px" />
          <img src={imggov} alt="" width="150px" height="150px" />
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#343434]">
        <h1 className="text-[#fff] text-xs p-1">
          © COPYRIGHT FATEC JALES 2024
        </h1>
      </div>
    </div>
  );
};

export default Footer;
