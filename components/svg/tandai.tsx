interface Props {
  color: string | undefined;
}

const Tandai = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 3.28478C3.5 3.02988 3.70351 2.82324 3.95455 2.82324H13.0455C13.2965 2.82324 13.5 3.02988 13.5 3.28478V14.3617C13.5 14.5484 13.3893 14.7167 13.2194 14.7881C13.0495 14.8595 12.854 14.82 12.724 14.688L8.5 10.399L4.27596 14.688C4.14596 14.82 3.95045 14.8595 3.7806 14.7881C3.61075 14.7167 3.5 14.5484 3.5 14.3617V3.28478ZM4.40909 3.74632V13.2474L8.17859 9.41995C8.3561 9.23971 8.6439 9.23971 8.82141 9.41995L12.5909 13.2474V3.74632H4.40909Z"
        fill={color ? color : "#525252"}
      />
    </svg>
  );
};

export default Tandai;
