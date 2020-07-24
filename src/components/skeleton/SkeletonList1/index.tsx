import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './index.scss';

const SkeletonList1 = () => {
    return (
        <div className="list-group">
            <div className="list-group-item">
                <div className="row d-flex justify-content-between">
                    <h5 className="col-10">
                        <Skeleton count={2} />
                    </h5>
                    <small className="col-2">
                        <Skeleton count={1} />
                    </small>
                </div>

                <Skeleton count={3} />

                <div className="row">
                    <small className="col-2">
                        <Skeleton />
                    </small>
                </div>
            </div>
        </div>
    );
};

export default SkeletonList1;
