'use client'
import { CoreServices } from '@/types/node'
import { thirds } from '@/utils/third'
interface ModalProps {
  onValueChange(): void
  coreServices: CoreServices[]
}

const AddOns2 = ({ ...data }: ModalProps) => {
  return (
    <div className="relative flex rounded-[10px] bg-[#F9F9F9] px-[10px] py-[8px] text-[#000] md:px-[12px] md:py-[9px] lg:px-[14px] lg:py-[11px] xl:px-[16px] xl:py-[12px] xl:pb-[360px] 2xl:px-[20px] 2xl:py-[15px] 2xl:pb-[100px]">
      <div className="relative flex gap-x-[10px]">
        <div className="text-[10px] font-bold md:text-[12px] lg:text-[14px] lg:!leading-[24px] xl:pl-[5px] xl:text-[16px] 2xl:text-[20px]">
          AddOns
        </div>
      </div>
      <div className="ml-[47.5px]  gap-x-[25px] md:ml-[57px]  md:gap-x-[30px] lg:ml-[66.5px] lg:gap-x-[35px] xl:ml-[136px] xl:gap-x-[40px] 2xl:ml-[170px] 2xl:gap-x-[50px]">
        <div className="flex items-center gap-x-[7px] lg:gap-x-[15px]">
          <div
            className={`h-[10px] w-[10px] cursor-pointer rounded-[5px] border-[1px] border-[#D9D9D9] bg-[#0354EC] hover:bg-[#0354EC] md:h-[12px] md:w-[12px] lg:h-[14px] lg:w-[14px] xl:h-[16px] xl:w-[16px] 2xl:h-[20px] 2xl:w-[20px] `}
          ></div>
          <div className="flex 2xl:gap-x-[10px]">
            <div className="text-[10px] font-medium  md:text-[12px]  lg:text-[14px]  lg:!leading-[24px] xl:text-[16px] 2xl:text-[20px]">
              Building a decentralized data infrastructure
            </div>
          </div>
        </div>
        <div className="mt-[14px]  grid gap-y-[11px] md:mt-[16.8px] md:gap-y-[13.2px] lg:mt-[19.6px] lg:gap-y-[15.4px] xl:mt-[22.4px] xl:gap-y-[17.6px] 2xl:mt-[28px] 2xl:gap-y-[22px]">
          {data.coreServices
            .filter((service) => thirds.includes(service.name))
            .map((option, index) => (
              <div key={index}>
                <div className="flex items-center gap-x-[8px] 2xl:gap-x-[10px]">
                  <img
                    src="/images/reviewYourBuild/bola.svg"
                    alt="image"
                    className="w-[10px] md:w-[12px] lg:w-[14px] xl:w-[16px] 2xl:w-[20px]"
                  />
                  <div className="relative text-[9px] font-bold text-[#313131] md:text-[10.8px] lg:text-[12.6px] xl:text-[14.4px] 2xl:text-[18px]">
                    {option.name}
                    <img
                      src="/images/reviewYourBuild/question.svg"
                      alt="image"
                      className="absolute top-0 -right-[6px] w-[4px] md:-right-[7.2px] md:w-[4.8px] lg:-right-[8.4px] lg:w-[5.6px] xl:-right-[9.6px] xl:w-[6.4px] 2xl:-right-[12px] 2xl:w-[8px]"
                    />
                    {option.isFree && (
                      <div className="absolute -right-[25px] -top-[7.5px] text-[7px] font-normal text-[#12AD50] md:-right-[30px] md:-top-[9px] md:text-[8.4px] lg:-right-[35px]  lg:-top-[10.5px] lg:text-[9.8px]  xl:-right-[40px] xl:-top-[12px]  xl:text-[11.2px] 2xl:-top-[15px] 2xl:-right-[50px] 2xl:text-[14px]">
                        Free
                      </div>
                    )}
                  </div>
                  <img
                    src="/images/reviewYourBuild/check.svg"
                    alt="image"
                    className="absolute right-[37.5px] ml-auto w-[8.5px] md:right-[45px] md:w-[10.2px] lg:right-[52.5px] lg:w-[11.9px] xl:right-[60px] xl:w-[13.6px] 2xl:right-[75px] 2xl:w-[17px]"
                  />
                </div>
                <div className="pl-[15px] text-[7px] font-normal text-[#505050] md:pl-[18px] md:text-[8.4px] lg:pl-[21px] lg:text-[9.8px] xl:pl-[24px] xl:text-[11.2px] 2xl:pl-[30px] 2xl:text-[14px]">
                  {option.description}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AddOns2
