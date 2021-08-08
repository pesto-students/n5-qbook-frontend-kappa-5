import React from "react";

import DatePicker from 'react-datepicker';
import CardStats from "components/Cards/CardStats.js";

import { selectAppointmentList,selectSearchTerm,selectedDate,updateSearchTerm,updateSelectedDate } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';

export default function HeaderAppointments() {
  const appointmentListData = useSelector(selectAppointmentList)
  const searchText = useSelector(selectSearchTerm)
  const searchDate = useSelector(selectedDate)
  const dispatch = useDispatch();

  const handleSearchText=(e)=>{
    dispatch(updateSearchTerm(e.target.value))
  }
  const handleSearchDate=(date)=>{
    dispatch(updateSelectedDate(date))
  }
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="mt-5 px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 xl:w-12/12 px-4 flex flex-row">
               
                <form className="md:flex hidden flex-wrap items-center mr-3 w-full ml-3 justify-between">
            <div className="relative flex w-6/12 flex-wrap items-stretch xl:w-6/12">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                value={searchText}
                onChange={handleSearchText}
                placeholder="Search by Name Or Phone Number"
                className="border-0 px-3 py-3 mr-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
              
            </div>
            <div className="relative flex w-6/12 flex-wrap items-stretch xl:w-6/12">
            <DatePicker
              selected = {searchDate}
              onChange={date=>handleSearchDate(date)}
              showYearDropdown
              dateFormat="MM/dd/yyyy"
              isClearable
              scrollableMonthYearDropdown
              onChangeRaw={(e)=>e.preventDefault()}
              placeholderText="Filter by Date..."
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-end w-8 pl-3 py-3">
                <i className="fas fa-filter"></i>
              </span>             
              </div>
          </form>
          <div className="relative flex lg:w-full flex-wrap items-stretch xl:w-6/12">
          <CardStats
                  statSubtitle="Appointments"
                  statTitle={appointmentListData?.length}
                />
                </div>
              </div>             
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
