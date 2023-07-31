import ContentLoader, {Rect} from 'react-content-loader/native';
import React from 'react';

const HomeSkeleton = () => (
  <ContentLoader speed={1} backgroundColor="lightgray" foregroundColor={'#999'}>
    <Rect x="10" y="17" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="77" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="137" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="197" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="257" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="317" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="377" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="437" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="497" rx="4" ry="4" width="380" height="50" />
    <Rect x="10" y="557" rx="4" ry="4" width="380" height="50" />
  </ContentLoader>
);

export default HomeSkeleton;
