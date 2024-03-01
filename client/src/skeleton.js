import './skeleton.css';

const SkeletonLoader = () => {
    return (
      <div className="skeleton">
        <div className="skeleton-title"></div>
        <div className="skeleton-info"></div>
        <div className="skeleton-info"></div>
        <div className="skeleton-info"></div>
        <div className="skeleton-info"></div>
      </div>
    );
};

export default SkeletonLoader;