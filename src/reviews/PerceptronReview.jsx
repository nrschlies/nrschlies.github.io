import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const PerceptronReview = () => {
  return (
    <div className="review-text-content">
      <h4>1. The Biological Inspiration</h4>
      <p>
        Working on porting over.
      </p>

      <h4>2. The Update Rule</h4>
      <p>
        Working on porting over.
      </p>
      
      <div className="math-wrapper">
        <BlockMath math="W_{t+1} = W_t + (y - \hat{y})X_t" />
      </div>

      <p>
        Test: Where <InlineMath math="y" /> is the target class and <InlineMath math="\hat{y}" /> is the predicted output.
      </p>

      <h4>3. Convergence Theorem</h4>
      <p>
        Working on porting over. <InlineMath math="T < \infty" />.
      </p>
    </div>
  );
};

export default PerceptronReview;