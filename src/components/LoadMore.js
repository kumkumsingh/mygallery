import React from 'react'
import { Button } from "@material-ui/core";

export default function LoadMore(props) {
    return (
        <div>
          {/* button to load more photos on click of load more button */}
        <Button variant="contained" color="primary" onClick={props.onLoadMore}>
            Load More
          </Button>
        </div>
    )
}
