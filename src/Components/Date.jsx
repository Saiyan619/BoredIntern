import React from "react";
import {DatePicker} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function Date({hireTimeLimit, sethireTimeLimit}) {
  // const [value, setValue] = React.useState(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker className="max-w-[284px]" label="Date (controlled)" value={hireTimeLimit} onChange={sethireTimeLimit} />
        <p className="text-default-500 text-sm">
          Selected date: {hireTimeLimit ? formatter.format(hireTimeLimit.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
    </div>
  );
}
