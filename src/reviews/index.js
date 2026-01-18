import PerceptronReview from './PerceptronReview';
import KalmanReview from './KalmanReview';

// Map the "id" from your JSON file to the Component here
const reviewRegistry = {
  1: PerceptronReview, 
  2: KalmanReview,
  // Future examples:
  // 2: GraphSignalReview,
};

export default reviewRegistry;