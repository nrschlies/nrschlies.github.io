import { InlineMath, BlockMath } from 'react-katex';

// Importing images
import image1 from '../data/review_images/kalman/image_1.jpg'; // Linear Discrete-Dynamic Block Diagram
import image2 from '../data/review_images/kalman/image_2.jpg'; // Linear Discrete Dynamic System

const KalmanReview = () => {
  return (
    <div className="review-text-content">
      
      {/* --- HEADER INFO --- */}
      <h4>Key Equations (derived below)</h4>
      <p>
        <strong>Optimal Estimate:</strong>
        <BlockMath math="x^*_{t+1|t} = \Phi(t+1;t)x^*(t|t-1) + \Delta^*(t)y(t)" />
      </p>
      <p>
        <strong>Estimation Error:</strong>
        <BlockMath math="x_{t+1|t} = \Phi^*(t+1;t)x(t|t-1) + u(t)" />
      </p>
      <p>
        <strong>Covariance Matrix of the Estimation Error:</strong>
        <BlockMath math="P^*(t) = \text{cov}\{ x_{t+1|t} \} = \mathbb{E}\{ x_{t+1|t}x'_{t+1|t} \}" />
      </p>
      <p>
        <strong>Expected Quadratic Loss:</strong>
        <BlockMath math="\sum_{i=1}^{n} \mathbb{E}[ x_i^2(t|t-1) ] = \text{trace}(P^*(t))" />
      </p>
      <p>
        <strong>Kalman Gain:</strong>
        <BlockMath math="\Delta^* = \Phi(t+1;t)P^*(t)M'(t)" />
        <BlockMath math="\Delta^* = \frac{\Phi(t+1;t)P^*(t)M'(t)}{M(t)P^*(t)M'(t)}" />
      </p>
      <p>
        <strong>Modified State Transition Matrix:</strong>
        <BlockMath math="\Phi^*(t+1;t) = \Phi(t+1;t) - \Delta^*(t)M(t)" />
      </p>
      <p>
        <strong>Future Covariance Matrix of Estimated Error:</strong>
        <BlockMath math="P^*(t+1) = \Phi^*(t+1;t)P^*(t)\Phi'(t+1;t) + Q(t)" />
      </p>

      {/* --- ABSTRACT NOTES --- */}
      <h4>Abstract Notes</h4>
      <p>
        Kalman begins by attributing the Bode-Shannon representation of random processes and the state transition method of analysis:
      </p>
      <p>
        <strong>Random Processes:</strong> Sequences of random variables that illustrate a system’s state over time.
      </p>
      <p>
        <strong>Bode-Shannon Representation:</strong> Used to describe frequency response and the quantification of uncertainty. 
        Hendrik Bode showed how systems respond to various inputs in the frequency domain. Claude Shannon provided the theoretical tools to quantify and measure uncertainty in systems.
      </p>
      <p>
        <strong>State Transitions:</strong> Involve modeling the evolution of a system’s state from one time step to the next. 
        Here, a state is a set of variables that encapsulate all necessary information about a system’s condition. 
        The State Transition Equation describes how the state of the system changes with time.
      </p>
      <p>
        <strong>Dynamic Systems:</strong> Evolve over time according to certain rules. The Kalman filter models these systems using state-space representations.
      </p>
      <p>Kalman provides a filter for stationary, nonstationary, growing memory, and infinite memory processes:</p>
      <ul>
        <li>
            <strong>Stationary Processes:</strong> Statistical properties, such as mean and variance, do not change over time. 
            The Kalman filter can leverage these constant properties to make accurate predictions and filter out noise. 
            Such processes include white noise and temperature fluctuations. In such an environment, the statistical behavior of the process can be modeled using a fixed set of parameters.
        </li>
        <li>
            <strong>Nonstationary Processes:</strong> Statistical properties change over time. 
            The Kalman filter can update its parameters dynamically as it processes new data, making it suitable for a wider range of transient applications. 
            Examples include GDP, population growth, and speech signals.
        </li>
        <li>
            <strong>Growing Memory:</strong> The idea that a filter may take into account an increasing amount of past data over time. 
            Through the recursive nature of the Kalman filter, each state estimate is dependent on both the previous and new measurements.
        </li>
        <li>
            <strong>Infinite Memory:</strong> A filter that considers all past data indefinitely, as opposed to a fixed window. 
            Such a system is crucial in systems that must robustly latch on to information. This latching task closely models the experiment performed using recurrent neural networks (RNNs) shown by Bengio et al. [2].
        </li>
      </ul>
      <p>
        The Kalman filter applies to nonlinear or differential equations for the covariance of the expected error. The filtering problem is the dual of the noise-free regulator problem:
      </p>
      <p>
        <strong>Noise-free Regulator Problem:</strong> Involves controlling a system so that it behaves despite the presence of disturbances.
      </p>

      {/* --- INTRODUCTION NOTES --- */}
      <h4>Introduction Notes</h4>
      <p>
        Prediction of random signals, separation of random signals from random noise, and the detection of signals in known form amidst noise are statistical and can all be augmented by a Kalman filter. 
        The foundations of such lie on Wiener and that of the Wiener-Hopf Equation.
      </p>
      <p>
        <strong>Wiener-Hopf Equation:</strong> Addresses separating signals from random noise in finding an optimal filter that processes a signal in a way that minimizes the error in the separation of signal from noise.
      </p>
      <p>
        Consider a process given additional noise <InlineMath math="N(t)" />. The observed process <InlineMath math="Y(t) = X(t) + N(t)" />. We want to find a linear filter that gives the estimate <InlineMath math="\hat{X}(t)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\hat{X}(t) = \int_{-\infty}^{\infty} h(\tau)Y(t-\tau)d\tau" />
      </div>

      <p>
        The goal is to minimize the mean squared error (MSE) between <InlineMath math="X(t)" /> and <InlineMath math="\hat{X}(t)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="MSE = \mathbb{E}[(X(t) - \hat{X}(t))^2] = 0" />
      </div>
      
      <p>The MSE can be expanded as:</p>
      <div className="math-wrapper">
        <BlockMath math="MSE = \mathbb{E}[X(t)^2] - 2\mathbb{E}[X(t)\hat{X}(t)] + \mathbb{E}[\hat{X}(t)^2] = 0" />
      </div>

      <p>
        The first term can be defined by the following autocorrelation function of the signal <InlineMath math="X(t)" />, <InlineMath math="R_X(\tau)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="R_X(\tau) = \mathbb{E}[X(t)X(t+\tau)]" />
      </div>

      <p>For <InlineMath math="\tau = 0" /> (zero-lag):</p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[X(t)^2] = R_X(0)" />
      </div>

      <p>If <InlineMath math="X(t)" /> is zero-mean:</p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[X(t)^2] = \text{Var}(X(t)) = R_X(0)" />
      </div>

      <p>
        Alternatively, in the frequency domain, <InlineMath math="\mathbb{E}[X(t)^2]" /> can be computed by integrating the power spectral density (PSD) of <InlineMath math="X(t)" /> over all frequencies, <InlineMath math="S_X(f)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[X(t)^2] = \int_{-\infty}^{\infty} S_X(f)df" />
      </div>

      <p>The cross-correlation function <InlineMath math="R_{xy}(\tau)" /> is defined as:</p>
      <div className="math-wrapper">
        <BlockMath math="R_{xy}(\tau) = \mathbb{E}[X(t)Y(t+\tau)]" />
      </div>

      <p>
        The middle term can be expressed using the cross-correlation function between <InlineMath math="X(t)" /> and <InlineMath math="Y(t)" />, <InlineMath math="R_{xy}(\tau)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[X(t)\hat{X}(t)] = \int_{-\infty}^{\infty} h(\tau)R_{XY}(\tau)d\tau" />
      </div>

      <p>
        The autocorrelation function measures how the value of the process at one time relates to its value at another time:
      </p>
      <div className="math-wrapper">
        <BlockMath math="R_Y(\tau_1 - \tau_2) = \mathbb{E}[Y(t-\tau_1)Y(t-\tau_2)]" />
      </div>

      <p>Thus, the last term can be expressed with impulse responses as:</p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[\hat{X}(t)^2] = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} h(\tau_1)h(\tau_2)R_Y(\tau_1 - \tau_2)d\tau_1d\tau_2" />
      </div>

      <p>Using the PSD approach to <InlineMath math="\mathbb{E}[X(t)^2]" />, the equation becomes:</p>
      <div className="math-wrapper">
        <BlockMath math="MSE = \int_{-\infty}^{\infty} S_X(f)df - 2\int_{-\infty}^{\infty} h(\tau)R_{XY}(\tau)d\tau + \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} h(\tau_1)h(\tau_2)R_Y(\tau_1 - \tau_2)d\tau_1d\tau_2" />
      </div>

      <p>The derivative of the MSE with respect to impulse response <InlineMath math="h(t)" /> is:</p>
      <div className="math-wrapper">
        <BlockMath math="\frac{\delta MSE}{\delta h(\tau)} = -2R_{XY}(\tau) + 2\int_{-\infty}^{\infty} h(\tau')R_Y(\tau - \tau')d\tau = 0" />
      </div>

      <p>The Wiener-Hopf Integral equation is given as:</p>
      <div className="math-wrapper">
        <BlockMath math="R_{XY}(\tau) = \int_{-\infty}^{\infty} h(\tau')R_Y(\tau - \tau')d\tau'" />
      </div>

      <p>It can be noted that for means <InlineMath math="\mu_X" /> and <InlineMath math="\mu_Y" />:</p>
      <div className="math-wrapper">
        <BlockMath math="R_{XX} = \mathbb{E}[X(t) - \mu_X)(X(t + \tau) - \mu_X)]" />
        <BlockMath math="R_{YY} = \mathbb{E}[Y(t) - \mu_Y)(Y(t + \tau) - \mu_Y)]" />
      </div>

      <p>
        After performing Fourier Transforms on <InlineMath math="h(t)" />, <InlineMath math="R_{XX}(t)" />, <InlineMath math="R_{YY}(t)" />, <InlineMath math="R_{XY}(t)" /> (i.e., spectral factorization):
      </p>
      <div className="math-wrapper">
        <BlockMath math="H(f) = \int_{-\infty}^{\infty} h(\tau)e^{-j2\pi fr}dr" />
        <BlockMath math="S_X(f) = \int_{-\infty}^{\infty} R_{XX}(\tau)e^{-j2\pi fr}dr = \int_{-\infty}^{\infty} \mathbb{E}[X(t) - \mu_X)(X(t + \tau) - \mu_X)]e^{-j2\pi fr}d\tau" />
        <BlockMath math="S_Y(f) = \int_{-\infty}^{\infty} R_{YY}(\tau)e^{-j2\pi fr}dr = \int_{-\infty}^{\infty} \mathbb{E}[Y(t) - \mu_Y)(Y(t + \tau) - \mu_Y)]e^{-j2\pi fr}d\tau" />
        <BlockMath math="S_{XY}(f) = \int_{-\infty}^{\infty} R_{XY}(\tau)e^{-j2\pi fr}dr = \int_{-\infty}^{\infty} \mathbb{E}[X(t) - \mu_X)(Y(t + \tau) - \mu_Y)]e^{-j2\pi fr}d\tau" />
      </div>

      <p>In the frequency domain, the Wiener-Hopf equation becomes:</p>
      <div className="math-wrapper">
        <BlockMath math="S_{XY}(f) = \int_{-\infty}^{\infty} R_{XY}(\tau)e^{-j2\pi fr}dr = H(f)S_Y(f)" />
      </div>

      <p>The optimal filter can then be solved as:</p>
      <div className="math-wrapper">
        <BlockMath math="H(f) = \frac{S_{XY}(f)}{S_Y(f)}" />
      </div>

      <p>Which of course can be expanded as:</p>
      <div className="math-wrapper">
        <BlockMath math="H(f) = \frac{\int_{-\infty}^{\infty} \mathbb{E}[X(t) - \mu_X)(Y(t + \tau) - \mu_Y)]e^{-j2\pi fr}d\tau}{\int_{-\infty}^{\infty} \mathbb{E}[Y(t) - \mu_Y)(Y(t + \tau) - \mu_Y)]e^{-j2\pi fr}d\tau}" />
      </div>

      <p>
        The Wiener-Hopf equation allows us to find the optimal filter that minimizes the mean square error between the estimated signal and the actual signal <InlineMath math="X(t)" />.
      </p>
      <p>
        The objective is to obtain the specification of a linear dynamic system (Wiener filter) that accomplishes the prediction, separation, or detection of a random signal. 
        The Kalman Filter addresses several limitations for solving an optimal linear dynamic system:
      </p>
      <ol>
        <li>It is not easy to synthesize an optimal filter given its impulse response.</li>
        <li>Computation of this optimal impulse response is involved and exponentially becomes intractable as the problem complexity increases.</li>
        <li>Transient systems like growing-memory filters and nonstationary prediction require new derivations.</li>
        <li>Inherent assumptions about the system can lead to error.</li>
      </ol>

      <p>
        Conditional distributions and expectations are utilized to form means (first-order) and variances (second-order). 
        The Wiener filter finds the best estimate of a signal by projecting it onto the space spanned by observed data, as shown by Doob [3] and Loève [4]:
      </p>
      <p>
        <strong>Orthogonal Projections:</strong> Refer to the process of finding the best estimate of a random variable by projecting it onto a subspace of other random variables. 
        The best approximation (i.e., minimize MSE) is achieved via the conditional expectation.
      </p>
      <p>
        <strong>Joseph Doop:</strong> Formalized the concept of conditional expectation <InlineMath math="\mathbb{E}[X|Y]" />, the expected value of a random variable given another random variable. 
        He introduced martingales, a class of stochastic processes that model fair games. For a martingale <InlineMath math="X(t)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="X(t) = \mathbb{E}[X(t + 1)|X(t), X(t - 1),...]" />
      </div>

      <p>
        <strong>Michel Loève:</strong> Studied orthogonal projections in Hilbert spaces. In such a Hilbert space, the orthogonal projection of a signal onto another signal given projection operator <InlineMath math="P_Y" /> can be illustrated as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="X(t) = P_Y[X(t)]" />
      </div>

      <p>
        Amidst random signals and white noise, linear dynamic systems can be represented using a state system, which entails the information needed to describe the system’s future behavior given the current state. 
        While Wiener filtering previously used statistical methods to minimize the MSE, the state approach is more dynamic and aligns with state-space systems in control theory.
      </p>

      <p>
        Suppose <InlineMath math="X(t)" /> represents the state of the system at time <InlineMath math="t" /> and <InlineMath math="Y(t)" /> represents the observed, noisy signal. 
        Let <InlineMath math="A(t)" /> and <InlineMath math="B(t)" /> be matrices describing the system dynamics, <InlineMath math="U(t)" /> be a control input, <InlineMath math="W(t)" /> be process noise, <InlineMath math="C(t)" /> be a matrix describing how the state is observed, and <InlineMath math="V(t)" /> be the observation noise. 
        Let <InlineMath math="Q(t)" /> be the covariance of the process noise <InlineMath math="W(t)" /> and <InlineMath math="R(t)" /> be the covariance of the observation noise <InlineMath math="V(t)" />.
      </p>

      <p>The state-transition method can be described as:</p>
      <div className="math-wrapper">
        <BlockMath math="X(t + 1) = A(t)X(t) + B(t) + U(t) + W(t)" />
      </div>

      <p>The observed equation is then:</p>
      <div className="math-wrapper">
        <BlockMath math="Y(t) = C(t)X(t) + V(t)" />
      </div>

      <p>
        The covariance matrix <InlineMath math="P(t)" /> represents the uncertainty in the state estimate <InlineMath math="X(t)" /> and can be described using a Riccati equation:
      </p>
      <p>
        <strong>Riccati Equation:</strong> A type of nonlinear differential equation that governs the evolution of the covariance matrix of the estimation error. For matrices <InlineMath math="A(t)" />, <InlineMath math="B(t)" />, <InlineMath math="Q(t)" />, and <InlineMath math="R(t)" />, the Riccati differential equation is:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\frac{dP(t)}{dt} = A(t)P(t) + P(t)A^T(t) - P(t)B(t)R^{-1}(t)B^T(t)P(t) + Q(t)" />
      </div>

      <p>
        The first two terms <InlineMath math="A(t)P(t) + P(t)A^T(t)" /> describe how the covariance matrix evolves due to the system’s dynamics. 
        The third term <InlineMath math="-P(t)B(t)R^{-1}(t)B^T(t)P(t)" /> involves feedback from the measurement, scaled by the inverse of the noise covariance. 
        The last term incorporates the covariance of the process noise <InlineMath math="Q(t)" />.
      </p>

      <p>In discrete time, the Riccati difference equation similarly becomes:</p>
      <div className="math-wrapper">
        <BlockMath math="P(t + 1) = A(t)P(t)A^T(t) - \left[A(t)P(t)C^T(t)\left(C(t)P(t)C^T(t) + R(t)\right)^{-1}C(t)P(t)A^T(t)\right] + Q(t)" />
      </div>

      <p>
        The optimal filter coefficients <InlineMath math="K(t)" /> can be calculated from the covariance matrix <InlineMath math="P(t)" /> as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="K(t) = P(t)C^T(t)\left[C(t)P(t)C^T(t) + R(t)\right]^{-1}" />
      </div>

      <p>
        As mentioned, this new state-based formulation of the Wiener problem is the dual of the noise-free regulator problem. Such a method has clear applications in complex systems and nonstationary processes.
      </p>

      {/* --- NOTATION CONVENTION NOTES --- */}
      <h4>Notation Convention Notes</h4>
      <p>It is useful to deal with discrete dynamic systems where observations are made at time <InlineMath math="t_n" />.</p>
      <p>
        Vectors are denoted by a bar above letters (e.g., <InlineMath math="\bar{a}" />, <InlineMath math="\bar{b}" />, <InlineMath math="\bar{x}" />, <InlineMath math="\bar{y}" />). 
        For example, <InlineMath math="\bar{x} = [x_1, x_2, ..., x_n]^T" />.
      </p>
      <p>
        Matrices are denoted by a bar above capital letters (e.g., <InlineMath math="\bar{A}" />, <InlineMath math="\bar{B}" />, <InlineMath math="\bar{X}" />, <InlineMath math="\bar{Y}" />). 
        The transpose of a matrix is denoted by ‘. The expression <InlineMath math="\bar{x} \cdot \bar{y}'" /> results in a matrix with elements <InlineMath math="x_i y_j" />.
      </p>
      <p>
        The scalar product of two vectors measures correlation and is obtained by multiplying corresponding vector components and summing the results:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\bar{x}' \cdot \bar{y} = \sum_{i=1}^{n} x_i y_i = \bar{y}' \cdot \bar{x}" />
      </div>

      <p>A quadratic form is an expression involving a vector and a matrix that results in a scalar:</p>
      <div className="math-wrapper">
        <BlockMath math="\bar{x}' \cdot \bar{Q} \cdot \bar{x} = \sum_{i,j=1}^{n} x_i q_{ij} x_j" />
      </div>

      <p>The expectation operator denotes the expected value of a random vector <InlineMath math="\bar{x}" />:</p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[\bar{x}] = \mathbb{E}\bar{x}" />
      </div>

      <p>
        For a discrete random variable <InlineMath math="X" />, the expected value is calculated by summing over all possible values weighted by probability of occurrence. 
        Given <InlineMath math="x_i" />, the possible values that random variable <InlineMath math="X" /> can take, the expected value is:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[X] = \sum_{i} x_i \cdot P(X = x_i)" />
      </div>

      {/* --- KALMAN LIST OF SYMBOLS --- */}
      <h4>Kalman’s List of Symbols</h4>
      <p>Kalman provides the following list of symbols for ease of reference. Let:</p>
      <ul>
        <li><InlineMath math="t" />: Time in general, present time</li>
        <li><InlineMath math="t_0" />: Time at which observations start</li>
        <li><InlineMath math="x_1(t), x_2(t)" />: Basic random variables</li>
        <li><InlineMath math="y(t)" />: Observed random variable</li>
        <li><InlineMath math="x^*_1(t_1|t)" />: The optimal estimate of <InlineMath math="x_1(t_1)" /> given <InlineMath math="y(t_0), ..., y(t)" /></li>
        <li><InlineMath math="L" />: Loss function</li>
        <li><InlineMath math="\epsilon" />: Estimation error (random variable)</li>
        <li><InlineMath math="\mathcal{Y}(t)" />: The linear manifold generated by the random variables <InlineMath math="y(t_0), ..., y(t)" /></li>
        <li><InlineMath math="x(t_1|t)" />: The orthogonal projection of <InlineMath math="x(t_1)" /> onto <InlineMath math="\mathcal{Y}(t)" /></li>
        <li><InlineMath math="\Phi(t+1; t)" />: Transition matrix</li>
        <li><InlineMath math="Q(t)" />: Covariance matrix of noise</li>
      </ul>

      {/* --- OPTIMAL ESTIMATES --- */}
      <h4>Optimal Estimates</h4>
      <p>
        Consider an original signal of interest <InlineMath math="x_1(t)" /> and noise <InlineMath math="x_2(t)" /> such that the observable signal is given by:
      </p>
      <div className="math-wrapper">
        <BlockMath math="y(t) = x_1(t) + x_2(t)" />
      </div>

      <p>
        Here, the challenge is to estimate the signal <InlineMath math="x_1(t)" /> at some time <InlineMath math="t_1" /> based on the observed data <InlineMath math="y(t)" /> up to the current time <InlineMath math="t" />. 
        The Kalman approach unifies interpolation, filtering, and prediction:
      </p>
      <ol>
        <li><strong>Data smoothing or interpolation:</strong> If <InlineMath math="t_1 < t" />, the goal is to estimate a past value of a signal based on later observations.</li>
        <li><strong>Filtering:</strong> If <InlineMath math="t_1 = t" />, the goal is to estimate the current value of the signal using all past observations up to time <InlineMath math="t" />.</li>
        <li><strong>Prediction:</strong> If <InlineMath math="t_1 > t" />, the goal is to predict a future value of the signal based on observations made up to time <InlineMath math="t" />.</li>
      </ol>

      <p>
        In the context of estimation, the signal <InlineMath math="x_1(t)" />, noise <InlineMath math="x_2(t)" />, and observed data <InlineMath math="y(t)" /> can be treated as random processes. 
        Given a set of observed values of the random variable <InlineMath math="\eta(t_0), ..., \eta(t)" />, the conditional probability distribution for the values of the signal <InlineMath math="x_1(t_1)" /> can be determined at any time <InlineMath math="t_1" />. 
        Such a conditional probability distribution is defined as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\Pr(x_1(t_1) \leq \xi_1 | y(t_0) = \eta(t_0), ..., y(t) = \eta(t)) = F(\xi_1)" />
      </div>

      <p>
        Here, <InlineMath math="y(t_0) = \eta(t_0), ..., y(t) = \eta(t)" /> are the observed values of the random variable <InlineMath math="y(t)" /> at various times. 
        Thus, any statistical estimate of <InlineMath math="x_1(t_1)" /> is based on this distribution <InlineMath math="F(\xi_1)" />. 
        Such a conditional distribution can, in turn, allow the computation of the deterministic function <InlineMath math="X(t_1|t)" />, which is the estimate of <InlineMath math="x_1(t_1)" /> given observations up to time <InlineMath math="t" />.
      </p>

      <p>
        We’ve established that <InlineMath math="X(t_1)" /> is an estimate of the unknown signal <InlineMath math="x_1(t_1)" /> and is derived given the observable data <InlineMath math="y(t_0), ..., y(t)" />. 
        Such an estimate is still treated as a random variable because it is based on other random variables.
      </p>

      <p>
        The estimation error <InlineMath math="\epsilon" /> is the difference between the actual value <InlineMath math="x_1(t_1)" /> and the estimated value <InlineMath math="X(t_1)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\epsilon = x_1(t_1) - X(t_1)" />
      </div>

      <p>
        The loss function <InlineMath math="L(\epsilon)" /> quantifies how costly such an estimation error is. This helps in optimizing the estimation process by minimizing the expected loss. 
        In the case that the estimate is perfect:
      </p>
      <div className="math-wrapper">
        <BlockMath math="L(0) = 0 \text{ where } \epsilon = 0" />
      </div>

      <p>
        The loss function should be non-decreasing such that as the error increases, the loss should increase or stay the same. 
        The loss function is symmetric around zero so that overestimating or underestimating by the same amount incurs the same penalty:
      </p>
      <div className="math-wrapper">
        <BlockMath math="L(\epsilon) = L(-\epsilon)" />
      </div>

      <p>
        The loss function is also positive for any non-zero error, reflecting some penalty. For a positive constant <InlineMath math="a" />, some examples of loss functions include:
      </p>
      <ul>
        <li><strong>Quadratic Loss:</strong> <InlineMath math="L(\epsilon) = a\epsilon^2" />, where the penalty grows quadratically with the error.</li>
        <li><strong>Absolute Loss:</strong> <InlineMath math="L(\epsilon) = a|\epsilon|" />, where the penalty grows linearly with the error.</li>
        <li><strong>Higher-Order Loss:</strong> <InlineMath math="L(\epsilon) = a\epsilon^4" />, where the penalty grows more rapidly for larger errors.</li>
        <li><strong>Exponential Loss:</strong> <InlineMath math="L(\epsilon) = a(1 - e^{-\epsilon^2})" />, which increases rapidly for larger errors but flattens out for small errors.</li>
      </ul>

      <p>
        The choice of a loss function reflects the specific goals and constraints of the estimation problem. The goal of Kalman filtering is to select <InlineMath math="X_1(t_1)" /> such that it minimizes the average loss or risk. 
        In other words, we want to minimize the expected value of the loss function:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\min \mathbb{E}[L(x_1(t_1) - X_1(t_1))]" />
      </div>

      <p>
        Crucially, such an expectation must take into account the observations <InlineMath math="y(t_0), ..., y(t)" />. This yields a nested expectation to model the conditional loss:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[L(x_1(t_1) - X_1(t_1))] = \mathbb{E}\left[\mathbb{E}[L(x_1(t_1) - X_1(t_1))| y(t_0), ..., y(t)]\right]" />
      </div>

      <p>
        Since the outer expectation doesn’t depend on the estimate <InlineMath math="X_1(t_1)" />, it is sufficient to minimize the inner expectation. This yields a more computable formulation of the objective function:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\min \mathbb{E}[L(x_1(t_1) - X_1(t_1))| y(t_0), ..., y(t)]" />
      </div>

      <p>
        The optimal estimate <InlineMath math="x^*_1(t_1)" /> that minimizes the expected loss is simply the conditional expectation of <InlineMath math="x_1(t_1)" /> given the observations <InlineMath math="y(t_0), ..., y(t)" />. 
        Such is true under the following criterion:
      </p>
      <ol>
        <li>
            <strong>Symmetry:</strong> The conditional distribution <InlineMath math="F(\xi_1)" /> must be symmetric about its mean <InlineMath math="x_1(t_1)" />. 
            For any deviation <InlineMath math="\delta \xi" /> from the mean, the probability that the conditional expectation is less than the deviation below the mean <InlineMath math="\xi - \delta" /> is the same as the probability of that conditional expectation being greater than deviation above the mean <InlineMath math="\xi + \delta" />. 
            It follows then that <InlineMath math="F(\xi - \xi) = 1 - F(\xi + \xi)" />.
        </li>
        <li>
            <strong>Convexity:</strong> The conditional distribution <InlineMath math="F(\xi_1)" /> is convex for values less than the mean <InlineMath math="\xi" />. 
            This ensures that there is one prominent mode where most of the probability mass is concentrated (i.e., the mean). 
            This condition is expressed as <InlineMath math="F(\lambda\xi_1 + (1-\lambda)\xi_2) \leq \lambda F(\xi_1) + (1-\lambda)F(\xi_2)" />.
        </li>
      </ol>

      <p>
        Under these conditions, it follows using Sherman’s probability theory [5] that the random variable <InlineMath math="x^*_1(t_1)" /> that minimizes the average loss is the conditional expectation:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x^*_1(t_1) = \mathbb{E}[x_1(t_1)| y(t_0), ..., y(t)]" />
      </div>

      <p>
        Consider the case of a quadratic loss function <InlineMath math="L(\epsilon) = \epsilon^2" />. Kalman notes that the above equation is true even in cases when symmetry and convexity are broken. 
        Note that the above equation, when expanded to quadratic loss, becomes:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[(x_1(t_1) - X_1(t_1))^2 | y(t_0), ..., y(t)]" />
      </div>

      <p>This can be expanded as:</p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[x_1^2(t_1) | y(t_0), ..., y(t)] - 2X_1(t_1)\mathbb{E}[x_1(t_1) | y(t_0), ..., y(t)] + X_1^2(t_1)" />
      </div>

      <p>
        The first term is the expected value of the square of <InlineMath math="x_1(t_1)" />, conditioned on the observed values, and represents the average squared value of the true state over all realizations. 
        The second term is a linear estimate that represents the interaction between the estimate <InlineMath math="X_1(t_1)" /> and the expected value of the state. 
        The last term is the square of the estimate <InlineMath math="X_1^2(t_1)" /> and represents the penalty of the estimate itself.
      </p>

      <p>
        When we differentiate the expanded expression with respect to <InlineMath math="X_1(t_1)" /> and set it to zero, we find the estimated value that minimizes the expected error. Such a derivative is:
      </p>
      <div className="math-wrapper">
        <BlockMath math="2\mathbb{E}[x_1(t_1)| y(t_0), ..., y(t)] + 2X_1(t_1) = 0" />
      </div>

      <p>Which in turn yields:</p>
      <div className="math-wrapper">
        <BlockMath math="X_1(t_1) = \mathbb{E}[x_1(t_1)| y(t_0), ..., y(t)]" />
      </div>

      <p>Kalman ends the section by noting that these theorems apply to vector-valued estimation problems, which are inherently much more applicable.</p>

      {/* --- ORTHOGONAL PROJECTIONS --- */}
      <h4>Orthogonal Projections</h4>
      <p>
        Unless the processes <InlineMath math="x_1(t_1)" /> and <InlineMath math="x_2(t_2)" /> are Gaussian, calculating the optimal estimate <InlineMath math="x_1(t_1|t)" /> given only the observed data <InlineMath math="y(t)" /> is impossible. 
        Let’s consider this Gaussian approach with a quadratic loss function <InlineMath math="L(\epsilon) = \epsilon^2" />, where the estimate is a linear function of the observed random variables. 
        For Gaussian processes with linear estimation, the optimal estimate is the same as the one you’d get with a quadratic loss function. 
        Linear estimation can be improved by nonlinear estimation when the random processes are non-Gaussian.
      </p>
      <p>
        Consider the real-valued set of observed random variables <InlineMath math="y(t_0), ..., y(t)" />. 
        Kalman represents any linear combination of the observed random variables given coefficients <InlineMath math="a_i" /> from time <InlineMath math="t_0" /> to time <InlineMath math="t" /> as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\sum_{i=t_0}^{t} a_i y_i(t)" />
      </div>

      <p>
        The set of these linear combinations forms a linear manifold (vector space) denoted by <InlineMath math="\mathcal{Y}(t)" />. 
        This space contains all possible vectors that can be formed by taking linear combinations of the observed data and represents all the possible observation outcomes. 
        Such a manifold can be seen as a finite-dimensional subspace within the larger space of all possible observations.
      </p>

      <p>
        Note that any vectors <InlineMath math="u, v" /> in <InlineMath math="\mathcal{Y}(t)" /> is a linear combination of the observed random variables. 
        Thus, these vectors are orthogonal if their expectation is 0:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[uv] = 0" />
      </div>

      <p>
        Using Gram-Schmidt to create an orthonormal basis in <InlineMath math="\mathcal{Y}(t)" />, Kalman creates a set of vectors <InlineMath math="\{e_{t_0}, ..., e_t\}" /> that are orthogonal to each other and have unit length. 
        Such an orthonormal basis follows that:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[e_i e_j] = \delta_{ij} = \begin{cases} 0 & \text{if } i \neq j \\ 1 & \text{if } i = j \end{cases}" />
      </div>

      <p>
        Any vector <InlineMath math="x" /> in <InlineMath math="\mathcal{Y}(t)" /> can be expressed as a unique linear combination of these orthonormal basis vectors:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x = \sum_{i=t_0}^{t} a_i e_i" />
      </div>

      <p>
        To determine the coefficients <InlineMath math="a_i" />, Kalman projects the vector <InlineMath math="x" /> onto the basis vectors <InlineMath math="e_j" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[xe_j] = \mathbb{E}\left[\sum_{i=t_0}^{t} a_i e_i e_j\right] = \sum_{i=t_0}^{t} a_i \delta_{ij} = a_j" />
      </div>

      <p>
        Given that <InlineMath math="x" /> lies within a linear manifold <InlineMath math="\mathcal{Y}(t)" /> of the observations and <InlineMath math="x" /> is orthogonal to that manifold, 
        the random variable <InlineMath math="x" /> is described as the linear combination:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x = x + x" />
      </div>

      <p>
        Since <InlineMath math="x" /> is the orthogonal projection of <InlineMath math="x(t_1)" /> onto <InlineMath math="\mathcal{Y}(t)" />, it follows that:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x = \sum_{i=t_0}^{t} \mathbb{E}[xe_i]e_i + x" />
      </div>

      <p>
        Such an orthogonal projection minimizes the quadratic loss function. If you were to estimate <InlineMath math="x" /> using any other vector <InlineMath math="w" />, the quadratic loss would not be optimal:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[(x - w)^2] = \mathbb{E}[(x + x - w)^2] = \mathbb{E}[(x - x) + (x - w)]^2" />
      </div>

      <p>
        Since <InlineMath math="x" /> is orthogonal to every vector in the linear manifold, including <InlineMath math="x - w" />, Kalman applies the Pythagorean theorem to deduce:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[(x - w)^2] = \mathbb{E}[(x - x)^2] + \mathbb{E}[(x - w)^2] \geq \mathbb{E}[(x - x)^2]" />
      </div>

      <p>
        Due to this orthogonality, the error is minimized when <InlineMath math="w = x" />. Analytically, Kalman has shown that <InlineMath math="x" /> is the optimal orthogonal projection to minimize the expected squared error among all possible approximations within the manifold. This generates the following:
      </p>

      <p>
        Given two zero-mean random processes <InlineMath math="\{x(t)\}" /> and <InlineMath math="\{y(t)\}" /> with observed random variables <InlineMath math="y(t_0), ..., y(t)" />, 
        the optimal estimate of <InlineMath math="x_1(t_1|t)" /> given these observations is the orthogonal projection of <InlineMath math="x(t_1)" /> onto the linear manifold generated by these observed variables <InlineMath math="\mathcal{Y}(t)" />. 
        Such a result assumes:
      </p>
      <ol>
        <li>All random processes are Gaussian (zero-mean) [orthogonal random variables are independent]</li>
        <li>The optimal estimate is a linear function of the observed random variables</li>
        <li>The loss function is quadratic</li>
      </ol>

      <p>
        Kalman extends this formulation to vector-valued random variables and notes that the optimal estimate can be viewed as the linear combination of all previous observations (i.e., the output of a linear filter). 
        However, just knowing the impulse response does not solve the estimation problem, and more explicit formulas are necessary.
      </p>

      {/* --- MODELS FOR RANDOM PROCESSES --- */}
      <h4>Models for Random Processes</h4>
      <p>
        While primary sources of random phenomena model a Gaussian distribution, there is often a statistical correlation between signals over time. 
        A random function of time can be thought of as the output of a dynamic system that is excited by an independent Gaussian process. 
        Since Gaussian random signals are invariant under linear transformations, the underlying dynamic system can be assumed to be linear.
      </p>
      <p>
        System dynamics can be encapsulated into states, which summarize everything necessary about the past behavior to predict the future in a minimal set of variables. 
        State transitions describe how the system evolves over time. Kalman provides the general description of a linear dynamic system. Let:
      </p>
      <ul>
        <li><InlineMath math="x(t)" />: The state vector of a system</li>
        <li><InlineMath math="u(t)" />: The input vector to the system</li>
        <li><InlineMath math="F(t)" />: A matrix representing the system dynamics</li>
        <li><InlineMath math="D(t)" />: A matrix representing how the input affects the state change</li>
        <li><InlineMath math="y(t)" />: The output vector of the system</li>
        <li><InlineMath math="M(t)" />: A matrix representing the relationship between the state and the output</li>
      </ul>

      <p>A linear dynamic system is governed by the following equations:</p>
      <div className="math-wrapper">
        <BlockMath math="\frac{dx}{dt} = F(t)x + D(t)u(t)" />
        <BlockMath math="y(t) = M(t)x(t)" />
      </div>

      <p>
        If the matrices <InlineMath math="F(t)" />, <InlineMath math="D(t)" />, and <InlineMath math="M(t)" /> are time-invariant, the system is stationary. 
        Conversely, the system is considered time-varying or non-stationary. Consider the figure below, where signal flows and operations are vectorized:
      </p>
      <div className="image-container">
        <img src={image1} alt="Linear Discrete-Dynamic Block Diagram" className="review-image" />
        <p className="caption">Figure 1: Linear Discrete-Dynamic Block Diagram</p>
      </div>

      <p>
        Since signal flows are vectorized, there are integrators for each component of the state vector <InlineMath math="x(t)" />. 
        The feedback loop defines the system’s dynamics by controlling how the current state influences its rate of change.
      </p>
      <p>
        Assume the linear dynamic system is stationary (i.e., the matrices <InlineMath math="F(t)" />, <InlineMath math="D(t)" />, and <InlineMath math="M(t)" /> are time-invariant). 
        Similarly, assume that the input does not vary within a sampling interval but can change from one interval to the next. 
        These assumptions yield a discrete-time system where:
      </p>
      <div className="math-wrapper">
        <BlockMath math="u(t + \tau) = u(t); 0 \leq t < 1, t = 0, 1, ..." />
      </div>

      <p>
        Consider <InlineMath math="\Phi(1)" />, a matrix that describes how the state evolves over one time step with zero input <InlineMath math="u(t)" />. 
        The matrix exponential <InlineMath math="\exp(F)" /> is the solution to the following linear differential equation:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\frac{dx(t)}{dt} = Fx(t)" />
      </div>

      <p>Which, given an initial state <InlineMath math="x(0)" />, yields the homogeneous solution:</p>
      <div className="math-wrapper">
        <BlockMath math="x_h(t) = \exp(Ft)x(0)" />
      </div>

      <p>Here the matrix exponential given square matrix <InlineMath math="F" /> and identity matrix <InlineMath math="I" /> is:</p>
      <div className="math-wrapper">
        <BlockMath math="\exp(F) = I + F + \frac{F^2}{2!} + \frac{F^3}{3!} + ... = \sum_{i=0}^{\infty} \frac{F^i}{i!}" />
      </div>

      <p>In the discrete case, this solution can be extended to:</p>
      <div className="math-wrapper">
        <BlockMath math="x_h(1) = \exp(F)x(0)" />
      </div>

      <p>Intuitively, the state transition matrix becomes:</p>
      <div className="math-wrapper">
        <BlockMath math="x(t + 1) = \exp(F)x(t) = \Phi(1)x(t)" />
        <BlockMath math="\Phi(1) = \exp(F) = \sum_{i=0}^{\infty} \frac{F^i}{i!}" />
      </div>

      <p>To find the particular solution of the linear differential equation, Kalman integrates the effect of the input over time:</p>
      <div className="math-wrapper">
        <BlockMath math="x_p(t) = \int_{0}^{t} \exp(F(t-\tau))Du(\tau)d\tau" />
      </div>

      <p>
        The discrete system can be sampled using <InlineMath math="\Delta t = t = 1" />. Also, since the input is constant during each sampling period, we can factor it out of the integral:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x_p(1) = Du(0)\int_{0}^{1} \exp(F(1-\tau))d\tau" />
      </div>

      <p>
        For <InlineMath math="\tau' = 1 - \tau" />, Kalman determines <InlineMath math="\Delta(1)" />, a matrix that captures the effect of the input on the state over one time step:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\Delta(1) = \int_{0}^{1} \exp(F\tau')d\tau' D" />
      </div>

      <p>This yields the following form of a linear discrete-dynamic system:</p>
      <div className="math-wrapper">
        <BlockMath math="x(t + 1) = \Phi(1)x(t) + \Delta(1)u(t); t = 0, 1, ..." />
        <BlockMath math="x(t + 1) = \sum_{i=0}^{\infty} \frac{F^i}{i!} x(t) + \int_{0}^{1} \exp(F\tau')d\tau' D u(t); t = 0, 1, ..." />
      </div>

      <div className="image-container">
        <img src={image2} alt="Linear Discrete Dynamic System" className="review-image" />
        <p className="caption">Figure 2: Linear Discrete Dynamic System</p>
      </div>

      <p>
        In other words, the state of the system at the next time step is determined both by the current state and the input. 
        The matrix <InlineMath math="\Delta(1)" /> modifies the input’s influence, while the state transition matrix <InlineMath math="\Phi(t + 1; t)" /> decides how the state evolves over time. 
        The output <InlineMath math="y(t)" /> is derived from the current state using matrix <InlineMath math="M(t)" />.
      </p>

      <p>
        Kalman extends to the nonstationary case where system matrices change with time. Resultantly, the state transition matrix <InlineMath math="\Phi(t + 1; t)" /> and the input effect matrix <InlineMath math="\Delta(1)" /> vary with time. 
        This yields the system shown above, with state equations:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x(t + 1) = \Phi(t + 1)x(t) + \Delta(1)u(t); t = 0, 1, ..." />
        <BlockMath math="y(t) = M(t)x(t)" />
      </div>

      <p>
        Such nonstationary systems depend on the specific form of <InlineMath math="F(t)" /> over time. Kalman mentions that in stationary systems, one can express <InlineMath math="\exp(Ft)" /> using the Laplace transform. 
        Since <InlineMath math="F(t)" /> is time-dependent in nonstationary systems, such a closed-form solution is not possible.
      </p>
      <p>
        Consider three time points <InlineMath math="s" />, <InlineMath math="r" />, and <InlineMath math="t" />. The state transition over the interval from <InlineMath math="t" /> to <InlineMath math="s" /> can be chained as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\Phi(t; s)\Phi(s; r) = \Phi(t; r)" />
      </div>

      <p>Similarly, the inverse rule states that:</p>
      <div className="math-wrapper">
        <BlockMath math="\Phi^{-1}(t; s) = \Phi(s; t)" />
      </div>

      <p>
        For a vector-valued, independent, zero-mean Gaussian random process <InlineMath math="\{u(t)\}" />, the state of a random phenomenon can be modeled by:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x(t + 1) = \Phi(t + 1; t)x(t) + u(t);" />
      </div>

      <p>Kalman notes three properties of such a random process <InlineMath math="\{u(t)\}" />:</p>
      <ol>
        <li><InlineMath math="\mathbb{E}[u(t)] = 0 \, \forall t" />: Since the expected value of <InlineMath math="u(t)" /> is zero, the noise has no bias.</li>
        <li><InlineMath math="\mathbb{E}[u(t)u'(s)] = 0 \text{ if } t \neq s" />: The noise at different time steps is independent.</li>
        <li><InlineMath math="\mathbb{E}[u(t)u'(t)] = G(t)" />: The covariance matrix <InlineMath math="G(t)" /> describes the magnitude and correlation of the noise within the same time step.</li>
      </ol>

      <p>
        The state <InlineMath math="x(t)" /> inherits the correlation structure imposed by the dynamics of the system and the input process <InlineMath math="u(t)" />. 
        In the steady-state case, Kalman neglects the initial state <InlineMath math="x(t_0)" /> and expresses the state <InlineMath math="x(t)" /> as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x(t) = \sum_{r=-\infty}^{t-1} \Phi(t; r + 1)u(r)" />
      </div>

      <p>For times <InlineMath math="t \geq s" />, the covariance of the state <InlineMath math="x(t)" /> with <InlineMath math="x(s)" /> is given by:</p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[x(t)x'(s)] = \sum_{r=-\infty}^{s-1} \Phi(t; r + 1)Q(r)\Phi'(s; r + 1) = \sum_{r=-\infty}^{s-1} \Phi(t; r + 1)\mathbb{E}[u(r)u'(r)]\Phi'(s; r + 1)" />
      </div>

      <p>Here, <InlineMath math="Q(r)" /> is the covariance matrix of the input noise <InlineMath math="u(r)" />:</p>
      <div className="math-wrapper">
        <BlockMath math="Q(r) = \mathbb{E}[u(r)u'(r)]" />
      </div>

      <p>
        Generally, instead of knowing the system dynamics <InlineMath math="\Phi(t + 1; t)" /> and the properties of the input noise <InlineMath math="u(t)" />, one might only have access to the covariance matrix <InlineMath math="Q(t)" /> (or an estimate of it based on data). 
        The challenge here is to infer the system dynamics <InlineMath math="\Phi(t + 1; t)" /> and the statistical properties of the noise from this covariance. 
        Such a problem is directly linked to the Wiener problem. Such an approach relies on primary, independent, zero-mean random sources with linear dynamic systems.
      </p>

      {/* --- SOLUTION OF THE WIENER PROBLEM --- */}
      <h4>Solution of the Wiener Problem</h4>
      <p>
        Recall that the goal is to estimate the optimal estimate <InlineMath math="x^*_t(t_1|t)" /> given the observed values <InlineMath math="y(t_0), ..., y(t)" /> by minimizing the expected loss. 
        Such an estimate is based on the following dynamic model. Let:
      </p>
      <ul>
        <li><InlineMath math="x(t)" />: The state vector at time <InlineMath math="t" /></li>
        <li><InlineMath math="u(t)" />: An independent Gaussian random process with zero mean</li>
        <li><InlineMath math="\Phi(t+1; t)" />: The transition matrix that governs the evolution of the state</li>
        <li><InlineMath math="\{ y(t) \}" />: The observed data vector</li>
        <li><InlineMath math="M(t)" />: The measurement matrix that maps the state vector to the observations</li>
      </ul>

      <p>The dynamic system in Kalman’s solution of the Wiener problem is then formulated as:</p>
      <div className="math-wrapper">
        <BlockMath math="x(t + 1) = \Phi(t + 1; t)x(t) + u(t)" />
        <BlockMath math="y(t) = M(t)x(t)" />
      </div>

      <p>
        As mentioned, such a model describes filtering, prediction, data smoothing, and reconstructing state variables given noisy observations.
      </p>
      <p>
        The first step is to utilize a recursive algorithm to estimate the state vector <InlineMath math="x(t_1)" />. 
        This is attained by projecting <InlineMath math="x(t_1)" /> onto the linear manifold formed by the observed random variables <InlineMath math="\mathcal{Y}(t)" />. 
        As proved above, this projection minimizes the estimation error.
      </p>
      <p>
        Suppose the observations <InlineMath math="y(t_0), ..., y(t-1)" /> have already been measured. When a new measurement <InlineMath math="y(t)" /> is taken, it can be decomposed into the following:
      </p>
      <ol>
        <li>Component that lies within the known manifold <InlineMath math="\mathcal{Y}(t-1)" />.</li>
        <li>
            Component that is orthogonal to the known manifold <InlineMath math="\mathcal{Y}(t-1)" />. 
            This component represents new information added by the latest measurement <InlineMath math="Z(t) = y(t|t-1) = y(t) - y(t|t-1)" />. 
            When the residual <InlineMath math="Z(t)" /> is zero, the new measurement does not provide any additional information such that <InlineMath math="\mathcal{Y}(t) = \mathcal{Y}(t-1)" />.
        </li>
      </ol>

      <p>
        Via induction, Kalman notes that <InlineMath math="x^*_{t_1-1|t-1}" /> is already known. 
        The optimal estimate <InlineMath math="x^*_{t_1|t}" /> at time <InlineMath math="t_1" /> given a new measurement at time <InlineMath math="t" /> is the sum of the projection of <InlineMath math="x(t_1)" /> on the previously known manifold <InlineMath math="\mathcal{Y}(t-1)" /> and the projection of <InlineMath math="x(t_1)" /> on the new information space <InlineMath math="Z(t) = y(t|t-1) = y(t) - y(t|t-1)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x^*_{t_1|t} = \mathbb{E}[x(t_1)|\mathcal{Y}(t)] = \mathbb{E}[x(t_1)|\mathcal{Y}(t-1)] + \mathbb{E}[x(t_1)|Z(t)] = \mathbb{E}[x(t_1)|\mathcal{Y}(t-1)] + \mathbb{E}[x(t_1)|y(t) - y(t|t-1)]" />
      </div>

      <p>
        Using the dynamic model, Kalman converts the prediction state based on <InlineMath math="t-1" /> as a state transition matrix projection <InlineMath math="\Phi(t_1; t+1)" /> with the expected value of the process noise given the previous data <InlineMath math="\mathbb{E}[u(t_1-1)|\mathcal{Y}(t-1)]" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\mathbb{E}[x(t_1)|\mathcal{Y}(t-1)] = \Phi(t_1; t+1)x^*_{t_1-1|t-1} + \mathbb{E}[u(t_1-1)|\mathcal{Y}(t-1)]" />
      </div>

      <p>This yields the expanded form of the optimal state estimation <InlineMath math="x^*_{t_1|t}" />:</p>
      <div className="math-wrapper">
        <BlockMath math="x^*_{t_1|t} = \Phi(t_1; t+1)x^*_{t_1-1|t-1} + \mathbb{E}[u(t_1-1)|\mathcal{Y}(t-1)] + \mathbb{E}[x(t_1)|y(t) - y(t|t-1)]" />
      </div>

      <p>
        Consider the case where <InlineMath math="t_1 = t + s, s \in \mathbb{Z}, s \geq 0" />. For some <InlineMath math="t_1 - 1" />, the process noise at time <InlineMath math="u(t_1-1)" /> is independent of all previous observations <InlineMath math="\mathcal{Y}(t-1)" />. 
        Such a process noise is orthogonal to the linear manifold <InlineMath math="\mathcal{Y}(t-1)" />. In such a case <InlineMath math="\mathbb{E}[u(t_1-1)|\mathcal{Y}(t-1)] = 0" />, and the state estimate simplifies to:
      </p>
      <div className="math-wrapper">
        <BlockMath math="x^*_{t_1|t} = \Phi(t_1; t+1)x^*_{t_1-1|t-1} + \mathbb{E}[x(t_1)|y(t) - y(t|t-1)]" />
      </div>

      <p>
        For the case where <InlineMath math="s < 0" />, the process noise <InlineMath math="u(t_1-1)" /> is not independent of the previous observations, which complicates the solution. Kalman’s analysis primarily considers the case <InlineMath math="t_1 \geq t" />.
      </p>

      <p>The state update equation now combines the predicted state and the innovation correction:</p>
      <div className="math-wrapper">
        <BlockMath math="x^*_{t+1|t} = \Phi(t+1; t)x^*(t|t-1) + \Delta^*(t)[y(t|t-1)]" />
      </div>

      <p>
        Kalman represents the expectation of a new state <InlineMath math="x(t)" /> given the innovation <InlineMath math="Z(t) = y(t|t-1) = y(t) - y(t|t-1)" /> and the existing state <InlineMath math="x(t-1)" />. 
        The Kalman gain <InlineMath math="\Delta(t)" /> modifies how much the estimate is adjusted by this new measurement. Such a gain is defined as:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\Delta^*(t) = \frac{\mathbb{E}[x(t_1)|Z(t)]}{\mathbb{E}[Z(t)Z'(t)]}" />
      </div>

      <p>This recursive state estimation combines prior knowledge with new information in an optimal way, minimizing the error in the estimate.</p>

      {/* --- COVARIANCE OF ESTIMATION ERROR --- */}
      <h4>Covariance of Estimation Error</h4>
      <p>
        The estimation error <InlineMath math="x(t) - x^*(t|t-1)" /> is a random variable because it depends on the random noise process <InlineMath math="u(t-1)" />. 
        To quantify the uncertainty in the estimate, Kalman defines the covariance matrix <InlineMath math="P(t)" /> of the estimation error:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(t) = \text{cov}\{x(t) - x^*(t|t-1)\} = \mathbb{E}\{(x(t) - x^*(t|t-1))(x(t) - x^*(t|t-1))'\}" />
      </div>

      <p>By expanding the error term using the definition of the Kalman filter’s state update equation, Kalman derives the covariance matrix:</p>
      <div className="math-wrapper">
        <BlockMath math="P(t) = \mathbb{E}\{(\Phi(t+1; t)x(t|t-1) + u(t) - (\Phi(t+1; t)x^*(t|t-1) + \Delta^*(t)y(t|t-1)))(...)\}" />
      </div>

      <p>
        Since the process noise <InlineMath math="u(t)" /> is independent of previous estimates, its expectation is zero, simplifying the covariance to:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(t) = \Phi(t+1; t)P(t)\Phi'(t+1; t) + Q(t)" />
      </div>

      <p>
        This recursive equation allows the computation of the covariance matrix <InlineMath math="P(t)" /> for the estimation error at each time step. 
        The first term in the equation represents the propagation of the covariance matrix through the state transition matrix, while the second term adds the effect of the process noise.
      </p>

      <p>
        The Kalman gain <InlineMath math="\Delta^*(t)" /> can now be expressed as a function of the covariance matrix <InlineMath math="P(t)" /> and the measurement noise covariance matrix <InlineMath math="R(t)" />:
      </p>
      <div className="math-wrapper">
        <BlockMath math="\Delta^*(t) = P(t)M'(t)[M(t)P(t)M'(t) + R(t)]^{-1}" />
      </div>

      <p>
        The covariance matrix <InlineMath math="P(t)" /> is updated in two stages. First, the a priori estimate <InlineMath math="P(t|t-1)" /> is computed based on the previous state and the state transition matrix:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P(t|t-1) = \Phi(t+1; t)P(t)\Phi'(t+1; t) + Q(t)" />
      </div>

      <p>Then, the a posteriori estimate <InlineMath math="P(t)" /> is updated using the Kalman gain and the measurement covariance matrix:</p>
      <div className="math-wrapper">
        <BlockMath math="P(t) = P(t|t-1) - \Delta^*(t)M(t)P(t|t-1)" />
      </div>

      <p>
        Kalman illustrates that the covariance matrix <InlineMath math="P(t)" /> is fundamental in determining how the estimation error evolves over time and how the Kalman gain adapts to minimize this error.
      </p>

      {/* --- STEADY STATE KALMAN FILTER --- */}
      <h4>Steady-State Kalman Filter</h4>
      <p>
        In a steady-state system where the system dynamics and noise characteristics do not change over time, the Kalman filter converges to a steady-state solution. 
        In this case, the covariance matrix <InlineMath math="P(t)" /> and the Kalman gain <InlineMath math="\Delta^*(t)" /> become time-invariant.
      </p>
      <p>
        Let <InlineMath math="P^*" /> be the steady-state covariance matrix, and let <InlineMath math="\Delta^*" /> be the steady-state Kalman gain. The steady-state equations are:
      </p>
      <div className="math-wrapper">
        <BlockMath math="P^* = \Phi P^* \Phi' + Q" />
        <BlockMath math="\Delta^* = P^* M' [M P^* M' + R]^{-1}" />
      </div>
      <p>
        In steady state, the Kalman filter provides a constant gain that can be precomputed and applied at each time step, significantly reducing computational complexity.
      </p>

      {/* --- SUMMARY AND CONCLUSIONS --- */}
      <h4>Summary and Conclusions</h4>
      <p>
        Kalman filtering provides a powerful framework for estimating the state of a dynamic system in the presence of noise. The key advantages of the Kalman filter include:
      </p>
      <ul>
        <li>
            <strong>Recursive Estimation:</strong> The Kalman filter updates estimates incrementally as new measurements arrive, making it well-suited for real-time applications.
        </li>
        <li>
            <strong>Optimality:</strong> Under the assumptions of linearity and Gaussian noise, the Kalman filter provides the best linear unbiased estimate of the system state.
        </li>
        <li>
            <strong>Flexibility:</strong> The Kalman filter can handle time-varying systems and can be extended to nonlinear systems using the Extended Kalman Filter (EKF).
        </li>
      </ul>
      <p>
        The Kalman filter has found widespread use in a variety of applications, including navigation, signal processing, and control systems. 
        Its ability to integrate noisy measurements and prior knowledge in an optimal way makes it a fundamental tool in modern engineering and applied sciences.
      </p>
      <p>
        As a final note, Kalman emphasizes the importance of understanding the underlying assumptions and limitations of the filter. 
        The filter's performance depends on accurate modeling of the system dynamics and noise characteristics. 
        In cases where these assumptions are violated, the filter may produce suboptimal or even erroneous estimates.
      </p>
      <p>
        For further reading and advanced applications, Kalman suggests exploring topics such as the Extended Kalman Filter (EKF), the Unscented Kalman Filter (UKF), 
        and particle filters, which are designed to handle nonlinear systems and non-Gaussian noise.
      </p>

      {/* --- FUTURE QUESTIONS --- */}
      <h4>Future Questions</h4>
      <p>The following are open research questions that build on the principles of Kalman filtering:</p>
      <ol>
        <li><strong>How can we use the Runge-Kutta method to approximate the transition matrix?</strong></li>
        <li><strong>How would we optimize the Kalman transition matrix distribution using KL-Divergence (or Contrastive Divergence with k-Gibbs steps (CD-k)) and a Neural Network?</strong></li>
        <li><strong>How can we utilize Kalman’s optimal state estimate in improving Neural Network performance? Can we consider inconsistencies in the loss surface as process noise during gradient descent?</strong></li>
        <li><strong>Can we use a GRU/LSTM instead of the Kalman Gain?</strong></li>
      </ol>

      <hr className="divider" />
      
      <h4>Citations</h4>
      <ul className="citation-list">
        <li>
            [1] Kalman, R. E. (1960). A new approach to linear filtering and prediction problems. 
            <em> Transactions of the ASME—Journal of Basic Engineering</em>, 82(Series D), 35–45.
        </li>
        <li>
            [2] Bengio, Y., Simard, P., & Frasconi, P. (1994). Learning long-term dependencies with gradient descent is difficult. 
            <em> IEEE Transactions on Neural Networks</em>, 5(2), 157-166.
        </li>
        <li>
            [3] Doob, J. L. (1953). <em>Stochastic Processes</em>. Wiley.
        </li>
        <li>
            [4] Loève, M. (1963). <em>Probability Theory</em> (3rd ed.). Van Nostrand.
        </li>
        <li>
            [5] Sherman, S. (1958). Non-mean-square error criteria. <em>IRE Transactions on Information Theory</em>, 4(3), 125-126.
        </li>
      </ul>

      {/* Styles reused from PerceptronReview */}
      <style>{`
        /* --- Typography & Layout --- */
        .review-text-content {
          line-height: 1.8;
          font-size: 1.05rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .review-text-content p {
          margin-bottom: 1.5rem;
          color: #d4d4d8;
        }

        /* --- List Spacing --- */
        .review-text-content ul, 
        .review-text-content ol {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }

        .review-text-content li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }

        /* --- Headers --- */
        .review-text-content h4 {
          margin-top: 3.5rem;
          margin-bottom: 1.25rem;
          color: var(--color-accent-blue);
          font-size: 1.5rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(14, 165, 233, 0.2);
          padding-bottom: 0.5rem;
          display: inline-block;
        }

        /* --- Math Blocks --- */
        .math-wrapper {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 3px solid var(--color-accent-gold);
          margin: 2.5rem 0;
          overflow-x: auto;
        }

        /* --- Images & Citations --- */
        .image-container {
          margin: 3rem 0;
          text-align: center;
        }
        
        .review-image {
          width: 100%;
          max-width: 700px;
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

export default KalmanReview;