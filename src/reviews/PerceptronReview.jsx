import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

// Importing images to ensure they work with the build system
// Make sure to rename your files in src/data/review_images/perceptron/
import image1 from '../data/review_images/perceptron/image_1.jpg'; // Organization
import image2 from '../data/review_images/perceptron/image_2.jpg'; // Gain Systems
import image3 from '../data/review_images/perceptron/image_3.jpg'; // Graph of Phi
import image4 from '../data/review_images/perceptron/image_4.jpg'; // Z-score Permutations
import image5 from '../data/review_images/perceptron/image_5.jpg'; // Z-score CDF
import image6 from '../data/review_images/perceptron/image_6.jpg'; // Sigma System
import image7 from '../data/review_images/perceptron/image_7.jpg'; // Beta System
import image8 from '../data/review_images/perceptron/image_8.jpg'; // IBM704

const PerceptronReview = () => {
  return (
    <div className="review-text-content">
      
      {/* --- OVERVIEW --- */}
      <h4>Overview</h4>
      <p>
        The inception of modern Neural Network theory is largely due to this paper, written by Frank Rosenblatt in 1958 at Cornell Aeronautical Laboratory. 
        Rosenblatt takes a connectionist approach towards neural modeling, with the advent of a perceptron including a <strong>retina</strong> (input stimulus), 
        <strong>projection area</strong>, <strong>association area</strong>, and <strong>responses</strong> (output). 
      </p>
      <p>
        He examines the characteristics and performance of an uncompensated gain system, constant feed system, and parasitic gain system in the context of a 
        sum-dominant or mean-dominant association. While this initial version of the perceptron is largely based on binomial distribution, Rosenblatt notes 
        that a bivalent reinforcement learning system can generalize, especially in the context of a binary-coded response system.
      </p>

      {/* --- INTRODUCTION --- */}
      <h4>Introduction</h4>
      <p>Rosenblatt begins by asking three foundational questions:</p>
      <ol>
        <li>How is information sensed?</li>
        <li>In what form is information remembered?</li>
        <li>How does memory influence behavior?</li>
      </ol>
      <p>
        The first of these questions is encompassed by the field of sensory physiology. Rosenblatt notes that there are two positions for the latter two questions. 
        The <em>coded representation hypothesis</em> argues that sensory information is in the form of coded representation with a one-to-one mapping between stimulus and stored pattern. 
        The other position is that of the <em>connectionist representation</em>, which entails that the central nervous system (CNS) acts as a switching network where retention takes the form of new connections. 
        The perceptron takes the connectionist approach.
      </p>
      <p>
        Previously, symbolic logic and Boolean algebra have been used in modeling the brain, but as you can imagine in the space of digital computation, 
        there is a severe need for empirical embedding (i.e., probability theory). Rosenblatt mentions that there are many differences in principle between 
        such a probabilistic system and the sophistication of the brain and offers the following assumption to help mitigate that gap:
      </p>
      <ul>
        <li>Physical connections are not identical between organisms. At birth most of these connections are initialized as random with genetic contribution.</li>
        <li>Connections have the capability for plasticity (ability to change).</li>
        <li>Similar stimuli form similar connections.</li>
        <li>Reinforcement facilitates connections.</li>
        <li>Similarity is the tendency of similar stimuli to activate the same set of cells.</li>
      </ul>

      {/* --- ORGANIZATION --- */}
      <h4>The Organization of a Perceptron</h4>
      <p>The figure below shows Rosenblatt’s original organization of a perceptron.</p>
      
      <div className="image-container">
        <img src={image1} alt="Perceptron Organization" className="review-image" />
        <p className="caption">Figure 1: Organization of a Perceptron</p>
      </div>

      <p>
        Stimuli strike the retina of sensory units (S-points), which either respond on an all-or-nothing basis or with a frequency proportional to the stimulus intensity.
        From the S-points, impulses are transmitted to what is called the origin points of the set of association cells (A-units). These origin points may either be excitatory or inhibitory, 
        depending if the sum of the impulse intensities is greater than or equal to the threshold <InlineMath math="\Theta" /> of the A-unit.
      </p>
      <p>
        A-units may or may not include a preliminary projection area (<InlineMath math="A_I" />), which in turn is randomly connected to an association area (<InlineMath math="A_{II}" />).
        The responses (<InlineMath math="R_n" />) are cells which generally have excitatory or inhibitory feedback connections to the cells in its source-set (A-cells that influence a particular response). 
        The set of connections between <InlineMath math="A_{II}" /> and <InlineMath math="R_n" /> are bidirectional. In this original notion of a perceptron, 
        the responses in a system are mutually exclusive (of which responses inhibit each other).
      </p>
      <p>
        The impulses delivered by an A-unit can be measured by a value (amplitude, frequency, or probability) of completing the transmission. In turn, Rosenblatt designs a characteristic table for different gain systems for the perceptron.
      </p>
      <ol>
        <li><strong>Alpha System (<InlineMath math="\alpha" />)</strong>: Active cell gains an increment of value for every impulse.</li>
        <li><strong>Beta System (<InlineMath math="\beta" />)</strong>: Source-sets have a constant rate of gain proportional to their activity.</li>
        <li><strong>Gamma System (<InlineMath math="\gamma" />)</strong>: Active cells gain value at the expense of inactive cells.</li>
      </ol>
      
      <div className="image-container">
        <img src={image2} alt="Gain Systems" className="review-image" />
        <p className="caption">Figure 2: Characteristic Gain Systems</p>
      </div>

      {/* --- ANALYSIS --- */}
      <h4>Analysis of the Predominant Phase</h4>
      <p>
        The author notes that the threshold <InlineMath math="\Theta" /> is fixed for all perceptrons here. Let:
      </p>
      <ul>
        <li><InlineMath math="P_a" />: expected proportion of A-units activated by a stimulus.</li>
        <li><InlineMath math="P_c" />: conditional probability that an A-unit which responds to one stimulus responds to another.</li>
        <li><InlineMath math="e" />: number of excitatory signals received.</li>
        <li><InlineMath math="x" />: total number of excitatory connections.</li>
        <li><InlineMath math="i" />: number of inhibitory signals received.</li>
        <li><InlineMath math="y" />: total number of inhibitory connections.</li>
        <li><InlineMath math="\Theta" />: threshold activation.</li>
        <li><InlineMath math="P(e,i)" />: joint probability that the A-unit will receive <InlineMath math="e" /> excitatory inputs and <InlineMath math="i" /> inhibitory inputs.</li>
        <li><InlineMath math="R" />: proportion of S-points activated.</li>
        <li><InlineMath math="R^e" />: probability of an excitatory input being activated.</li>
        <li><InlineMath math="R^i" />: probability of an inhibitory input being activated.</li>
      </ul>

      <p>
        Let’s begin this analysis with the derivation of the joint probability that the A-unit will receive <InlineMath math="e" /> excitatory inputs and <InlineMath math="i" /> inhibitory inputs <InlineMath math="P(e,i)" />. 
        We can use a joint binomial distribution to model such a scenario. We first consider the probability of having exactly <InlineMath math="e" /> excitatory inputs out of <InlineMath math="x" /> excitatory connections:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(e) = \binom{x}{e} R_e^e (1 - R_e)^{x - e}" />
      </div>

      <p>
        Similarly, for exactly <InlineMath math="i" /> inhibitory inputs out of <InlineMath math="y" /> connections:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(i) = \binom{y}{i} R_i^i (1 - R_i)^{y - i}" />
      </div>

      <p>
        In turn, we can obtain the joint probability <InlineMath math="P(e,i)" /> as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(e,i) = \binom{x}{e} R_e^e (1 - R_e)^{x - e} \binom{y}{i} R_i^i (1 - R_i)^{y - i}" />
      </div>

      <p>
        We sum over all possible values of <InlineMath math="e" /> from the threshold <InlineMath math="\Theta" /> to <InlineMath math="x" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P_a = \sum_{e=\Theta}^{x} P(e,i)" />
      </div>

      <p>
        We also account for valid inhibitory signals. The maximum inhibitory signals <InlineMath math="i" /> is limited by the net input condition <InlineMath math="i \le e - \Theta" />. 
        Thus, the expected proportion of activated A-units <InlineMath math="P_a" /> is:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P_a = \sum_{e=\Theta}^{x} \sum_{i=\Theta}^{\min(y, e-\Theta)} \binom{x}{e} R_e^e (1 - R_e)^{x - e} \binom{y}{i} R_i^i (1 - R_i)^{y - i}" />
      </div>

      <p>
        We continue by addressing the joint probability of connection change between stimulus transitions <InlineMath math="P(e,i,le,li,ge,gi)" />.
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(e,i,le,li,ge,gi) = \binom{x}{e} R_e^e (1 - R_e)^{x - e} \binom{y}{i} R_i^i (1 - R_i)^{y - i} \binom{e}{le} L_{le}^{le} (1 - L_{le})^{e - le} \binom{i}{li} L_{li}^{li} (1 - L_{li})^{i - li} \binom{x-e}{ge} G_{ge}^{ge} (1 - G_{ge})^{x - e - ge} \binom{y-i}{gi} G_{gi}^{gi} (1 - G_{gi})^{y - i - gi}" />
      </div>

      <p>
        It is now of interest to find the conditional probability <InlineMath math="P_c" /> that the A-unit will respond to one stimulus <InlineMath math="S_1" /> given another <InlineMath math="S_2" />.
        Since <InlineMath math="P_a" /> is the baseline probability that any A-unit will be activated, we define the conditional probability as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P_c = \frac{1}{P_a} \sum_{e=0}^{x} \sum_{i=0}^{y} \sum_{le=0}^{e} \sum_{li=0}^{i} \sum_{ge=0}^{x-e} \sum_{gi=0}^{y-i} P(e,i,le,li,ge,gi)" />
      </div>

      <p>
        Another metric of interest is the minimum conditional probability <InlineMath math="P_{c_{min}}" />, which entails the least favorable condition under which the perceptron can still recognize <InlineMath math="S_2" />.
      </p>
      <div className="math-wrapper">
        <BlockMath math="P_{c_{min}} = (1 - L)^x (1 - G)^y" />
      </div>

      {/* --- LEARNING --- */}
      <h4>Mathematical Analysis of Learning</h4>
      <p>
        Rosenblatt defines the postdominant response as the stage where activity is limited to a single source-set. He describes two systems to determine the dominant response:
      </p>
      <ol>
        <li><strong>Mean-discriminating System (<InlineMath math="\mu" />-system)</strong>: greatest mean value of inputs responds first.</li>
        <li><strong>Sum-discriminating System (<InlineMath math="\Sigma" />-system)</strong>: greatest net value of inputs responds first.</li>
      </ol>

      <p>
        Let’s take a quick aside to talk about <InlineMath math="\phi(Z)" />, the normal curve integral from <InlineMath math="-\infty" /> to <InlineMath math="Z" />.
      </p>
      <div className="math-wrapper">
        <BlockMath math="\phi(Z) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{Z} e^{-t^2/2} dt" />
      </div>

      <div className="image-container">
        <img src={image3} alt="Graph of Phi" className="review-image" />
        <p className="caption">Figure 3: Graph of <InlineMath math="\phi(Z)" /></p>
      </div>

      <p>
        We then want some way to have a normalized measure of our input stimulus <InlineMath math="nsr" />. We consider a linear transformation <InlineMath math="Y" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="Y = c_1 nsr + c_2" />
      </div>
      <p>And capture the variance via parameters <InlineMath math="c_3" /> and <InlineMath math="c_4" />:</p>
      <div className="math-wrapper">
        <BlockMath math="Z = \frac{c_1 nsr + c_2}{\sqrt{c_3 nsr^2 + c_4 nsr}}" />
      </div>

      <div className="image-container">
        <img src={image4} alt="Z-score Permutations" className="review-image" />
        <p className="caption">Figure 4: Z-score Permutations</p>
      </div>
      <div className="image-container">
        <img src={image5} alt="Z-score CDF Curves" className="review-image" />
        <p className="caption">Figure 5: Z-score CDF Curves</p>
      </div>

      <p>
        The probability that at least one <InlineMath math="A_r" /> unit is activated <InlineMath math="P(nar > 0)" /> is:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(nar > 0) = 1 - (1 - P_a)^{N_e}" />
      </div>

      <p>
        This probability of correct generalization <InlineMath math="P_g" /> and choice <InlineMath math="P_r" /> can be approximated to <InlineMath math="P" />, where:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P = P(nar > 0) \cdot \phi(Z)" />
      </div>

      <p>
        The <InlineMath math="Z" />-parameters for the <InlineMath math="\alpha" />-system in a <InlineMath math="\Sigma" />-system are:
      </p>
      <div className="math-wrapper">
        <BlockMath math="c_1 = 0" />
        <BlockMath math="c_2 = 1 - P_a N_e" />
        <BlockMath math="c_3 = 2 P_a" />
        <BlockMath math="c_4 = 0" />
      </div>

      <div className="image-container">
        <img src={image6} alt="Sigma System" className="review-image" />
        <p className="caption">Figure 6: <InlineMath math="\Sigma" />-system Probability</p>
      </div>

      <p>Similarly for the <InlineMath math="\beta" />-system:</p>
      <div className="math-wrapper">
        <BlockMath math="c_1 = 0, \quad c_2 = 1 - P_a N_e, \quad c_3 = 0, \quad c_4 = 2/N_r" />
      </div>

      <div className="image-container">
        <img src={image7} alt="Beta System" className="review-image" />
        <p className="caption">Figure 7: <InlineMath math="\beta" />-system Probability</p>
      </div>

      <p>
        Rosenblatt notes that the <InlineMath math="\beta" />-system struggles more than the <InlineMath math="\alpha" />-system due to the lack of parasitic impact on net values. 
        This is why the <InlineMath math="\gamma" />-system performs much better in practice.
      </p>

      {/* --- BIVALENT SYSTEMS --- */}
      <h4>Bivalent Systems</h4>
      <p>
        Rosenblatt mentions that a bivalent system consists of reinforcement learning. Binary-coded responses enable some sort of feedback (what is later developed as backpropagation). 
        He also mentions the ideas of overfitting and the need for a parasitic gain system. Such bivalent systems were trained on an IBM704 computer.
      </p>
      <div className="image-container">
        <img src={image8} alt="IBM704 Computer" className="review-image" />
        <p className="caption">Figure 8: IBM704 Computer (NASA)</p>
      </div>

      {/* --- CONCLUSIONS --- */}
      <h4>Conclusions and Evaluation</h4>
      <ol>
        <li>Given random stimuli, perceptrons can learn to extract features to specific stimuli.</li>
        <li>The probability of a correct response diminishes towards random as the number of stimuli learned increases.</li>
        <li>In such an environment, no basis for generalization exists.</li>
        <li>Learned associations can be retained amidst class learning.</li>
        <li>Contour-sensitive projection areas and binary response systems help this model.</li>
        <li>Trial-and-error learning is possible using reinforcement learning.</li>
        <li>Temporal stimulus can be learned via statistical separability.</li>
        <li>Perceptron memory is distributed.</li>
        <li>Spontaneous class recognition is possible.</li>
      </ol>

      <p>These findings rely on six fundamental parameters:</p>
      <ul>
        <li><InlineMath math="x" />: excitatory connections.</li>
        <li><InlineMath math="y" />: inhibitory connections.</li>
        <li><InlineMath math="\Theta" />: expected threshold.</li>
        <li><InlineMath math="\alpha" />: R-unit to A-unit connection proportion.</li>
        <li><InlineMath math="N_a" />: number of A-units.</li>
        <li><InlineMath math="N_r" />: number of R-units.</li>
      </ul>

      <p>
        Rosenblatt largely accredits Hebb’s philosophy on connectionist neurology and notes that this inspiration has allowed a feasible approach to cognitive systems with a quantitative statistical approach.
      </p>
      
      <hr className="divider" />
      
      <h4>Citations</h4>
      <ul className="citation-list">
        <li>
            [1] Rosenblatt, F. (1958). The perceptron: A probabilistic model for information storage and organization in the brain. 
            <em> Psychological Review</em>, 65(6), 386-408.
        </li>
        <li>
            [2] NASA. (1959). Human computer with IBM 704. Wikimedia Commons.
        </li>
      </ul>

<style>{`
        /* --- Typography & Layout --- */
        .review-text-content {
          line-height: 1.8;       /* Increases space between lines of text */
          font-size: 1.05rem;     /* Slightly larger font for readability */
          max-width: 800px;       /* Prevents lines from getting too long to read */
          margin: 0 auto;         /* Centers the content */
        }

        .review-text-content p {
          margin-bottom: 1.5rem;  /* Space after paragraphs */
          color: #d4d4d8;         /* Soft white (Zinc-300) for less eye strain */
        }

        /* --- List Spacing (The awkward part you noticed) --- */
        .review-text-content ul, 
        .review-text-content ol {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }

        .review-text-content li {
          margin-bottom: 0.75rem; /* Adds breathing room between bullet points */
          padding-left: 0.5rem;
        }

        /* --- Headers --- */
        .review-text-content h4 {
          margin-top: 3.5rem;     /* Pushes headers away from previous section */
          margin-bottom: 1.25rem;
          color: var(--color-accent-blue);
          font-size: 1.5rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(14, 165, 233, 0.2); /* Subtle blue underline */
          padding-bottom: 0.5rem;
          display: inline-block;  /* Underline only acts on text width */
        }

        /* --- Math Blocks --- */
        .math-wrapper {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 3px solid var(--color-accent-gold);
          margin: 2.5rem 0;       /* Big space around equations */
          overflow-x: auto;
        }

        /* --- Images & Citations --- */
        .image-container {
          margin: 3rem 0;         /* Isolate images visually */
          text-align: center;
        }
        
        .review-image {
          width: 100%;
          max-width: 700px;       /* Constrain image width */
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .caption {
          text-align: center;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-top: 0.75rem;
          font-style: italic;
        }

        .divider {
          border: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          margin: 4rem 0;
        }

        .citation-list {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          list-style-type: none;
          padding: 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 1rem;
        }
        
        .citation-list li {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PerceptronReview;