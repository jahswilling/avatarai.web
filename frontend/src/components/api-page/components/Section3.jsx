const Section3 = () => {
  return (
		<div>
			<div className="w-full py-20 bg-[#F4F5F6]">
				<div className="max-w-[1240px] mx-auto px-5 flex flex-col justify-center">
					<h4 className="text-[#333333] text-[2rem] font-bold mb-[2rem] text-center">
						All you need to generate and <br /> integrate. All in one place
					</h4>
					<p className="text-[#605E65] text-base text-center mb-[2rem]">
						Noxus APIs make it easy to integrate and generate custom illustrations into your app or website.
					</p>
					<img src="../images/code.svg" alt="" />
					<div className="flex justify-center">
						<button className="btn px-[26px] py-[12px] outline-none normal-case border border-[#8B70E9] rounded-lg bg-[#ffffff] text-[#8B70E9] mt-[49px]">
							API free trial
						</button>
					</div>
				</div>
			</div>

			<div className="w-full py-20 bg-[#FFFFFF]">
				<div className="max-w-[1240px] mx-auto px-5 flex flex-col justify-center">
					<h5 className="text-[#333333] text-[2rem] font-bold mb-[2rem] text-left">Ready to get started?</h5>
					<p className="text-[#605E65] text-base text-left mb-[2rem]">
						Noxus APIs make it easy to integrate and generate custom illustrations into your app or website.
					</p>

					<div className="grid grid-cols-12 gap-3 md:h-[542px]">
						<div className="col-span-12 md:col-span-6 flex items-center gap-3 h-full md:mr-3 mb-10 md:mb-0">
							<img src="../images/img1.svg" className="h-full w-1/2" alt="" />
							<img src="../images/img2.svg" className="h-full w-1/2" alt="" />
						</div>
						<div className="col-span-12 md:col-span-6 h-full relative rounded-lg w-full">
							<img src="../images/purple-pattern.svg" className="md:h-full w-full rounded-lg" alt="purple background" />
							<div className="absolute top-[35%] left-0 right-0 flex flex-col justify-center">
								<p className="text-[#ffffff] font-bold text-[1rem] md:text-[1.5rem] text-center">
									Create your account and <br />
									Integrate to start generating <br />
									your avatars.
								</p>
								<div className="flex justify-center">
									<button className="btn px-[26px] py-[12px] outline-none normal-case border border-[#333333] rounded-lg bg-[#333333] text-[#ffffff] mt-[2rem] md:mt-[70px]">
										Create sandbox account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Section3