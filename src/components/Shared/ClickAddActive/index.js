
 const ClickDate = (GetKeyValue, clickDateStatus) => {
      const SetTrue = [...clickDateStatus]
      SetTrue.map((SetFalse, index) => (SetTrue[index] = false))
      SetTrue[GetKeyValue] = true
      return SetTrue;
}

export default ClickDate;