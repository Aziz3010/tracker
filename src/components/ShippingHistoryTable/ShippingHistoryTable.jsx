import { getTranslations } from '@/utils/getTranslations';
import { formatDateTime } from '@/utils/helper';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

const ShippingHistoryTable = ({ transitEvents }) => {
  const tableHeader = ["branch", "date", "time", "detailsTitle"];
  const { lang } = useSelector((state) => state.langSlice);
  const t = getTranslations(lang ? lang : "en");

  return (
    <div className='w-full h-[250px] overflow-y-auto'>
      <Table responsive bordered hover>

        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th key={index}>
                <h3 className='p-[6px] text-gray text-x-small-size text-x-small-weight'>{t[item]}</h3>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {transitEvents?.map((item, index) => (
            <tr key={index}>
              <td>
                <h4 className='p-[6px] text--black text-x-small-size text-x-small-weight'>{item?.hub ? item?.hub : "-"}</h4>
              </td>
              <td>
                <h4 className='p-[6px] text--black text-x-small-size text-x-small-weight'>{formatDateTime(item?.timestamp, "numeric", false).shortDate}</h4>
              </td>
              <td>
                <h4 className='p-[6px] text--black text-x-small-size text-x-small-weight'>{formatDateTime(item?.timestamp, "numeric", false).time}</h4>
              </td>
              <td>
                <h4 className='p-[6px] text--black text-x-small-size text-x-small-weight'>{item?.state ? t[item?.state] : "-"}</h4>
                {item?.reason ? <h5 className='p-[6px] text-red text-x-small-size text-x-small-weight'>{item?.reason ? t[item?.reason] : '-'}</h5> : null}
              </td>
            </tr>
          ))}


        </tbody>
      </Table>
    </div>
  )
}

export default ShippingHistoryTable