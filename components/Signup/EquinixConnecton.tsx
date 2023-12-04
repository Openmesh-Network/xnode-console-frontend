/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react'
import { AccountContext } from '@/contexts/AccountContext'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EyeSlash, Eye } from 'phosphor-react'

type EquinixAPIForm = {
  apiKey: string
}

const EquinixConnection = () => {
  const [showTooltipCloudProvider, setShowTooltipCloudProvider] =
    useState<boolean>(false)
  const { setConnections } = useContext(AccountContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { user, setUser } = useContext(AccountContext)
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)

  const validSchema = Yup.object().shape({
    apiKey: Yup.string().max(500).required('Email is required'),
  })
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<EquinixAPIForm>({
    resolver: yupResolver<any>(validSchema),
  })

  async function connectEquinix(data: any) {
    const config = {
      method: 'post' as 'post',
      url: `${process.env.NEXT_PUBLIC_API_BACKEND_BASE_URL}/xnodes/functions/connectEquinixAPI`,
      headers: {
        'x-parse-application-id': `${process.env.NEXT_PUBLIC_API_BACKEND_KEY}`,
        'X-Parse-Session-Token': user.sessionToken,
      },
      data,
    }

    let dado

    await axios(config).then(function (response) {
      if (response.data) {
        dado = response.data
      }
    })

    return dado
  }

  async function onSubmit(data: EquinixAPIForm) {
    setIsLoading(true)
    const finalData = {
      ...data,
    }
    try {
      const res = await connectEquinix(finalData)
      toast.success('Success')
      const finalUser = user
      finalUser.equinixAPIKey = data.apiKey
      setUser(finalUser)
      setIsEditing(false)
      setIsLoading(false)
    } catch (err) {
      toast.error(`Error happened: ${err.response.data.message}`)
      setIsLoading(false)
    }
  }

  if (user?.equinixAPIKey) {
    return (
      <div className="relative rounded-[10px] bg-[#F9F9F9] px-[10px] py-[8px] pb-[60px] pr-[100px] text-[#000] md:px-[12px] md:py-[9px] lg:px-[14px] lg:py-[11px] xl:px-[16px] xl:py-[20px] xl:pb-[80px] xl:pr-[192px] 2xl:px-[20px] 2xl:py-[25px] 2xl:pb-[100px] 2xl:pr-[240px]">
        <div className="relative flex gap-x-[10px]">
          <div className="text-[10px] font-bold md:text-[12px] lg:text-[14px] lg:!leading-[24px] xl:pl-[5px] xl:text-[16px] 2xl:text-[20px]">
            You will also need to connect to Equinix 3rd party service to deploy
            the application.
          </div>
          <img
            src={`${
              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                ? process.env.NEXT_PUBLIC_BASE_PATH
                : ''
            }/images/firstStep/question-mark.svg`}
            alt="image"
            className="h-[9px] w-[9px] transform cursor-pointer transition-transform hover:scale-105 md:h-[11px] md:w-[11px]  lg:h-[12px] lg:w-[12px] xl:h-[14px] xl:w-[14px] 2xl:h-[18px] 2xl:w-[18px]"
            onMouseEnter={() => setShowTooltipCloudProvider(true)}
            onMouseLeave={() => setShowTooltipCloudProvider(false)}
          />
          {showTooltipCloudProvider && (
            <div className="absolute left-[0px] top-[40px] w-full max-w-[270px]  rounded-[10px] bg-[#000] px-[13px] py-[10px] text-[8px] font-medium text-[#fff] md:left-[162px] md:px-[15px] md:py-[12px] md:text-[9px] lg:left-[189px] lg:px-[17px] lg:py-[14px] lg:text-[11px] lg:!leading-[19px] xl:left-[216px] xl:px-[20px] xl:py-[16px] xl:text-[13px] 2xl:left-[500px] 2xl:px-[25px] 2xl:py-[20px] 2xl:text-[16px]">
              <div>If you have any third party that needs connection</div>
            </div>
          )}
        </div>
        <div className="mt-[56px] ml-[112px] 2xl:mt-[70px] 2xl:ml-[140px]">
          <div className="flex gap-x-[50px]">
            <img
              src={`${
                process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                  ? process.env.NEXT_PUBLIC_BASE_PATH
                  : ''
              }/images/signup/equinix-xnode.svg`}
              alt="image"
              className="w-[145px] md:w-[174px] lg:w-[203px] xl:w-[232px] 2xl:w-[290px]"
            />{' '}
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <div className="cursor-pointer text-[10px] text-[#0354EC] hover:text-[#0243bb] xl:text-[12px]">
                How to get my API key?
              </div>
            </a>
          </div>

          {isEditing && (
            <div>
              <div className="mt-[25px] md:mt-[30px] lg:mt-[35px] xl:mt-[40px] 2xl:mt-[50px]">
                <span className="flex flex-row">
                  Project API Key
                  <p className="ml-[8px] text-[10px] font-normal text-[#ff0000] ">
                    {errors.apiKey?.message}
                  </p>
                </span>
                <input
                  disabled={isLoading}
                  className="mt-[10px] h-[50px] w-[280px] rounded-[10px] border border-[#D4D4D4] bg-white px-[12px] text-[17px] font-normal outline-0 lg:w-[500px]"
                  type="text"
                  maxLength={500}
                  placeholder=""
                  {...register('apiKey')}
                />
              </div>
              {!isLoading && (
                <div
                  onClick={handleSubmit(onSubmit)}
                  className="mt-[41px] flex h-fit w-fit cursor-pointer justify-center gap-x-[8px] rounded-[5px] bg-[#0354EC] py-[6.2px] px-[11px] text-center text-[7px] font-medium text-[#fff] hover:bg-[#0e2e69] md:mt-[49px] md:py-[7.5px] md:px-[12.5px] md:text-[8.4px] lg:mt-[57px] lg:py-[8.75px]  lg:px-[42px] lg:text-[10px]   xl:mt-[65px] xl:py-[10px]    xl:px-[48px]  xl:text-[11.2px]  2xl:mt-[82px] 2xl:gap-x-[10px]  2xl:py-[12.5px] 2xl:px-[60px] 2xl:text-[14px]"
                >
                  <div>Connect</div>
                </div>
              )}
              {isLoading && (
                <div className="mt-[41px] flex h-fit w-fit justify-center gap-x-[8px] rounded-[5px] bg-[#719be9] py-[6.2px] px-[11px] text-center text-[7px] font-medium text-[#fff] md:mt-[49px] md:py-[7.5px] md:px-[12.5px] md:text-[8.4px] lg:mt-[57px] lg:py-[8.75px]  lg:px-[42px] lg:text-[10px]   xl:mt-[65px] xl:py-[10px]    xl:px-[48px]  xl:text-[11.2px]  2xl:mt-[82px] 2xl:gap-x-[10px]  2xl:py-[12.5px] 2xl:px-[60px] 2xl:text-[14px]">
                  <div>Connect</div>
                </div>
              )}
            </div>
          )}

          {!isEditing && (
            <div className="mt-[25px] flex gap-x-[20px] md:mt-[30px] lg:mt-[35px] xl:mt-[40px] 2xl:mt-[50px]">
              <div className="base:text-[8px] text-[#12AD50] md:text-[9.6px] lg:text-[11.2px] xl:text-[12.8px] 2xl:text-[16px]">
                Connected
              </div>
              <div
                onClick={() => {
                  setIsEditing(true)
                }}
                className="cursor-pointer font-medium text-[#0354EC] underline underline-offset-1 hover:text-[#276ff7]"
              >
                Edit
              </div>
            </div>
          )}
          {isEditing && (
            <div className="mt-[25px] flex gap-x-[20px] md:mt-[30px] lg:mt-[35px] xl:mt-[40px] 2xl:mt-[50px]">
              <div
                onClick={() => {
                  setIsEditing(false)
                }}
                className="cursor-pointer font-medium text-[#777777] underline underline-offset-1 hover:text-[#bebebe]"
              >
                Cancel
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative rounded-[10px] bg-[#F9F9F9] px-[10px] py-[8px] pb-[60px] pr-[100px] text-[#000] md:px-[12px] md:py-[9px] lg:px-[14px] lg:py-[11px] xl:px-[16px] xl:py-[20px] xl:pb-[80px] xl:pr-[192px] 2xl:px-[20px] 2xl:py-[25px] 2xl:pb-[100px] 2xl:pr-[240px]">
      <div className="relative flex gap-x-[10px]">
        <div className="text-[10px] font-bold md:text-[12px] lg:text-[14px] lg:!leading-[24px] xl:pl-[5px] xl:text-[16px] 2xl:text-[20px]">
          You will also need to connect to Equinix 3rd party service to deploy
          the application.
        </div>
        <img
          src={`${
            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
              ? process.env.NEXT_PUBLIC_BASE_PATH
              : ''
          }/images/firstStep/question-mark.svg`}
          alt="image"
          className="h-[9px] w-[9px] transform cursor-pointer transition-transform hover:scale-105 md:h-[11px] md:w-[11px]  lg:h-[12px] lg:w-[12px] xl:h-[14px] xl:w-[14px] 2xl:h-[18px] 2xl:w-[18px]"
          onMouseEnter={() => setShowTooltipCloudProvider(true)}
          onMouseLeave={() => setShowTooltipCloudProvider(false)}
        />
        {showTooltipCloudProvider && (
          <div className="absolute left-[130px] top-[0px] w-full max-w-[270px]  rounded-[10px] bg-[#000] px-[13px] py-[10px] text-[8px] font-medium text-[#fff] md:left-[162px] md:px-[15px] md:py-[12px] md:text-[9px] lg:left-[189px] lg:px-[17px] lg:py-[14px] lg:text-[11px] lg:!leading-[19px] xl:left-[216px] xl:px-[20px] xl:py-[16px] xl:text-[13px] 2xl:left-[270px] 2xl:px-[25px] 2xl:py-[20px] 2xl:text-[16px]">
            <div>If you have any third party that needs connection</div>
          </div>
        )}
      </div>
      <div className="mt-[56px] ml-[112px] 2xl:mt-[70px] 2xl:ml-[140px]">
        <div>
          <img
            src={`${
              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                ? process.env.NEXT_PUBLIC_BASE_PATH
                : ''
            }/images/signup/equinix-xnode.svg`}
            alt="image"
            className="w-[145px] md:w-[174px] lg:w-[203px] xl:w-[232px] 2xl:w-[290px]"
          />{' '}
        </div>
        <div className="mt-[25px] md:mt-[30px] lg:mt-[35px] xl:mt-[40px] 2xl:mt-[50px]">
          <span className="flex flex-row">
            Project API Key
            <p className="ml-[8px] text-[10px] font-normal text-[#ff0000] ">
              {errors.apiKey?.message}
            </p>
          </span>
          <div className="flex gap-x-[20px]">
            <input
              disabled={isLoading}
              className="mt-[10px] h-[50px] w-[280px] rounded-[10px] border border-[#D4D4D4] bg-white px-[12px] text-[17px] font-normal outline-0 lg:w-[500px]"
              type={passwordVisibility ? 'password' : 'text'}
              maxLength={500}
              placeholder=""
              {...register('apiKey')}
            />
            {passwordVisibility ? (
              <div
                onClick={() => setPasswordVisibility(false)}
                className="flex cursor-pointer items-center text-center"
              >
                <EyeSlash className="cursor-pointer" />
              </div>
            ) : (
              <div
                onClick={() => setPasswordVisibility(true)}
                className="flex cursor-pointer items-center text-center"
              >
                <Eye className="cursor-pointer" />
              </div>
            )}
          </div>
        </div>
        {!isLoading && (
          <div
            onClick={handleSubmit(onSubmit)}
            className="mt-[41px] flex h-fit w-fit cursor-pointer justify-center gap-x-[8px] rounded-[5px] bg-[#0354EC] py-[6.2px] px-[11px] text-center text-[7px] font-medium text-[#fff] hover:bg-[#0e2e69] md:mt-[49px] md:py-[7.5px] md:px-[12.5px] md:text-[8.4px] lg:mt-[57px] lg:py-[8.75px]  lg:px-[42px] lg:text-[10px]   xl:mt-[65px] xl:py-[10px]    xl:px-[48px]  xl:text-[11.2px]  2xl:mt-[82px] 2xl:gap-x-[10px]  2xl:py-[12.5px] 2xl:px-[60px] 2xl:text-[14px]"
          >
            <div>Connect</div>
          </div>
        )}
        {isLoading && (
          <div className="mt-[41px] flex h-fit w-fit justify-center gap-x-[8px] rounded-[5px] bg-[#719be9] py-[6.2px] px-[11px] text-center text-[7px] font-medium text-[#fff] md:mt-[49px] md:py-[7.5px] md:px-[12.5px] md:text-[8.4px] lg:mt-[57px] lg:py-[8.75px]  lg:px-[42px] lg:text-[10px]   xl:mt-[65px] xl:py-[10px]    xl:px-[48px]  xl:text-[11.2px]  2xl:mt-[82px] 2xl:gap-x-[10px]  2xl:py-[12.5px] 2xl:px-[60px] 2xl:text-[14px]">
            <div>Connect</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EquinixConnection