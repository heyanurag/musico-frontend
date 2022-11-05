import PersonIcon from "@mui/icons-material/Person";
import GitHubIcon from "@mui/icons-material/GitHub";
import Divider from "@mui/material/Divider";

export default function AboutUS() {
  return (
    <div className="min-h-full">
      <div className="flex items-center gap-5 mb-3">
        <div className="text-3xl text-[#735bc1]">About</div>
        <a target="_blank" href="https://github.com/heyanurag/musico-frontend">
          <GitHubIcon className="text-2xl" />
        </a>
      </div>
      <Divider className="my-5" />

      <div>
        <div className="text-center text-xl mb-5">Problem Definition</div>
        <div className="text-justify text-lg">
          With the rise of digital content distribution, people now have access
          to music collections on an unprecedented scale. Commercial music
          libraries easily exceed 15 million songs, which vastly exceeds the
          listening capability of any single person. With millions of songs to
          choose from, people sometimes feel overwhelmed. Thus, an efficient
          music recommender system is necessary in the interest of both music
          service providers and customers. Users will have no more pain to make
          decisions on what to listen while music companies can maintain their
          user group and attract new users by improving users’ satisfaction.
          This music recommendation system also helps the users to listen to the
          music based on their mood using which, an angry person can calm
          himself down by listening to the recommended songs.
        </div>
        <Divider className="my-5" />
      </div>

      <div>
        <div className="text-center text-xl mb-5">Motivation</div>
        <div className="text-justify text-lg">
          Many music streaming services, such as Pandora and Spotify, are
          developing high-precision commercial music recommendation systems at
          the moment. These businesses make money by assisting customers in
          finding appropriate music and charging them for the quality of their
          recommendations. As a result, there is a thriving market for good
          music recommendation systems.
        </div>
        <Divider className="my-5" />
      </div>

      <div>
        <div className="text-center text-xl mb-5">Scope of Project</div>
        <ul className="text-justify text-lg list-disc mx-3">
          <li>
            Music recommendation will be based on mood of the user which will be
            get from user’s facial expression.
          </li>
          <li>
            We will use an already existing streaming service in order to
            retrieve and play music as it is not in the scope of the project to
            develop our own music streaming service. We decided to use Spotify
            because of their extensive APIs and SDKs which are easy to use.
          </li>
          <li>
            Spotify also offers access to a large amount of audio feature data
            connected to the music which we retrieve and use in the recommender
            system.
          </li>
          <li>
            This music recommendation will be available through a web
            application where music will be displayed to user based on their
            facial expression and their previous watch history to enhance the
            search result.
          </li>
          <li>
            After selecting the music, user can play it on our web application.
          </li>
        </ul>
        <Divider className="my-5" />
      </div>
    </div>
  );
}
