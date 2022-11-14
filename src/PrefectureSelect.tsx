import React from 'react';

function PrefectureSelect (props: {
  pref: { prefCode: number; prefName: string; };
  }) {
    return (
      <option value={props.pref.prefCode}>{props.pref.prefName}</option>
    );
 }

 export { PrefectureSelect };
// export default PrefectureSelect;