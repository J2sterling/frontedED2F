// components/ProjectList.js
import React from 'react';
import ProjectItem from './ProjectItem';
import styles from '../styles/ProjectList.module.scss';

const ProjectList = ({ projects, onDeleteProject }) => {
    return (
        <ul className={styles.listGroup}>
            {projects.length === 0 ? (
                <li className={styles.noProjects}>No hay proyectos</li>
            ) : (
                projects.map((project) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        onDeleteProject={onDeleteProject}
                    />
                ))
            )}
        </ul>
    );
};

export default ProjectList;
