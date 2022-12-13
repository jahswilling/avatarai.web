import { Link } from "react-router-dom";
const ReadArticleNewsletter = () => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-around gap-[24px] bg-[#F9F9FB] py-[40px] md:py-[48px] px-[24px]">
      <div className="flex flex-col gap-[24px]">
        <Link to="/">
        <img src="/tapart.svg" height={`40px`} width={`40px`} />
        </Link>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#201F23] font-jakarta font-bold">
            Subscribe to our newsletter for info for new avatar scenes, blogs
            and updates
          </p>
          <p className="text-[#605E65] font-nunito">
            We'd send a confirmation email to you
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="border border-[#403E46] flex items-center md:gap-4 gap-1 justify-between p-[5px] h-[52px] w-full max-w-[512px] bg-white rounded">
          <div className="h-full flex md:gap-[8px] gap-1 items-center font-nunito grow text-[#848484] rounded py-[8px] md:pl-[12px] pl-2">
            <img src="/sms.svg" />
            <input
              type={`text`}
              className="grow outline-none"
              placeholder="Enter your email address"
            />
          </div>
          <div className="cursor-pointer bg-[#8B70E9] h-full relative flex items-center font-nunito text-white rounded px-[20px] py-[8px] -translate-x-[40px] lg:translate-x-0">
            <span>Subscribe</span>
          </div>
        </div>
        <p className="text-[#AFB6B6] text-sm">
          By subscribing you agree to accept newsletter and Emails from us.
        </p>
      </div>
    </section>
  );
};

export default ReadArticleNewsletter;
