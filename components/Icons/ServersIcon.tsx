import { IconProps } from '@/utils/icons'

export function ServersIcon({ fill = '#4D4D4D', ...rest }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="16" height="16" fill="url(#pattern0_2272_14400)" />
      <defs>
        <pattern
          id="pattern0_2272_14400"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2272_14400" transform="scale(0.00390625)" />
        </pattern>
        <image
          id="image0_2272_14400"
          width="256"
          height="256"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}