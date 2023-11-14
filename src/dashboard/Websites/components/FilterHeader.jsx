import React, { useEffect } from "react";
import { Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { applyFilter } from "../../../store/websiteReducer";
import { WEBSITE_FILTER } from "../../../utils/constants";

const FilterHeader = () => {
  const websites = useSelector((state) => state.website);
  const { data, filterResult, isApplyFilter, loading, filters } = websites;
  const dispatch = useDispatch();

  const onCloseTag = (value) => {
    dispatch(applyFilter({ ...filters, [value]: WEBSITE_FILTER[value] }));
  };

  const matchValue = (type) => filters[type] !== WEBSITE_FILTER[type];
  const matchRange = (type) =>
    filters[type][0] !== WEBSITE_FILTER[type][0] ||
    filters[type][1] !== WEBSITE_FILTER[type][1];

  return (
    <div className="filter-header">
      <div className="search-result">
        {matchValue("search") && (
          <div>
            <b>{filterResult.length}</b> results for <b>"{filters.search}"</b>
          </div>
        )}
      </div>
      <div>
        {matchRange("price") && (
          <Tag closable onClose={() => onCloseTag("price")} color="#108ee9">
            Price($): {filters.price[0]}-{filters.price[1]}
          </Tag>
        )}
        {matchRange("da") && (
          <Tag closable onClose={() => onCloseTag("da")} color="#108ee9">
            DA: {filters.da[0]}-{filters.da[1]}
          </Tag>
        )}
        {matchRange("dr") && (
          <Tag closable onClose={() => onCloseTag("dr")} color="#108ee9">
            DR: {filters.dr[0]}-{filters.dr[1]}
          </Tag>
        )}
        {matchRange("spam") && (
          <Tag closable onClose={() => onCloseTag("spam")} color="#108ee9">
            Spam: {filters.spam[0]}-{filters.spam[1]}
          </Tag>
        )}
        {matchValue("country") && (
          <Tag closable onClose={() => onCloseTag("country")} color="#108ee9">
            Country: {filters.country}
          </Tag>
        )}
        {matchValue("category") && (
          <Tag closable onClose={() => onCloseTag("category")} color="#108ee9">
            Category: {filters.category}
          </Tag>
        )}
        {matchValue("traffic") && (
          <Tag closable onClose={() => onCloseTag("traffic")} color="#108ee9">
            Traffic: {filters.traffic}
          </Tag>
        )}
        {matchValue("extension") && (
          <Tag closable onClose={() => onCloseTag("extension")} color="#108ee9">
            Extension: {filters.extension}
          </Tag>
        )}
      </div>
    </div>
  );
};

export default FilterHeader;
