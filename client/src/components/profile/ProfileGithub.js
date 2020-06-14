import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos]);

    return (
        <div>
            <div class="profile-github">
                <h2 class="text-primary my-1"><i class="fab fa-github"></i> Github Repos</h2>

                {repos === null ? (
                    <Spinner />
                ) : (
                        repos.map(repo => (
                            <div class="repo bg-white p-1 my-1" key={repos._id}>
                                <div>
                                    <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}</a>
                                    </h4>
                                    <p>{repo.description}</p>
                                </div>
                                <ul>
                                    <li className="badge badge-primary">
                                        Stars: {repo.stargazers_count}
                                    </li>
                                    <li className="badge badge-dark">
                                        Watchers: {repo.stargazers_count}
                                    </li>
                                    <li className="badge badge-light">
                                        Forks: {repo.stargazers_count}
                                    </li>
                                </ul>
                            </div>
                        ))
                    )}

                <div class="repo bg-white p-1 my-1">
                    <div>
                        <h4><a href="#" target="_blank"
                            rel="noopener noreferrer">Repo Two</a></h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Repellat, laborum!
              </p>
                    </div>
                    <div>
                        <ul>
                            <li class="badge badge-primary">Stars: 44</li>
                            <li class="badge badge-dark">Watchers: 21</li>
                            <li class="badge badge-light">Forks: 25</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
